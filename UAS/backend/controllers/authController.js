const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Basic validation for login (optional but good practice)
  if (!username || username.trim() === '') {
    return res.status(400).json({ message: 'Username tidak boleh kosong.' });
  }
  if (!password || password.trim() === '') {
    return res.status(400).json({ message: 'Password tidak boleh kosong.' });
  }

  userModel.findByUsername(username, (err, results) => {
    if (err) {
      console.error('Error finding user for login:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
    if (results.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        console.error('Error comparing password:', err);
        return res.status(500).json({ message: 'Terjadi kesalahan server.' });
      }
      if (!match) return res.status(401).json({ message: 'Password salah' });

      // Simpan data user ke session
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
        id_anggota: user.id_anggota
      };

      res.json({ message: 'Login berhasil', user: req.session.user });
    });
  });
};

exports.register = (req, res) => {
  const { username, password, role, id_anggota } = req.body;

  // --- START VALIDASI BACKEND UNTUK REGISTER ---
  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res.status(400).json({ message: 'Username tidak boleh kosong dan harus berupa teks.' });
  }
  if (!password || typeof password !== 'string' || password.trim() === '') {
    return res.status(400).json({ message: 'Password tidak boleh kosong dan harus berupa teks.' });
  }
  if (password.length < 6) { // Contoh: minimal 6 karakter
    return res.status(400).json({ message: 'Password minimal 6 karakter.' });
  }
  // Pastikan role adalah 'admin' atau 'anggota'
  const validRoles = ['admin', 'anggota'];
  if (!role || !validRoles.includes(role)) {
    return res.status(400).json({ message: 'Role tidak valid. Pilih "admin" atau "anggota".' });
  }

  // Jika role adalah 'anggota', id_anggota harus ada dan tidak kosong
  let final_id_anggota = null;
  if (role === 'anggota') {
    if (!id_anggota || typeof id_anggota !== 'string' || id_anggota.trim() === '') {
      return res.status(400).json({ message: 'ID Anggota tidak boleh kosong untuk role anggota.' });
    }
    // Opsional: Validasi id_anggota harus berupa angka jika memang ID numerik
    if (isNaN(id_anggota)) {
        return res.status(400).json({ message: 'ID Anggota harus berupa angka.' });
    }
    final_id_anggota = parseInt(id_anggota, 10); // Konversi ke integer
  }
  // --- END VALIDASI BACKEND UNTUK REGISTER ---

  bcrypt.hash(password, 10, (err, hashed) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat memproses password.' });
    }

    const data = {
      username: username.trim(),
      password: hashed,
      role: role,
      id_anggota: final_id_anggota // Gunakan nilai yang sudah divalidasi/konversi
    };

    userModel.createUser(data, (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        // Tangani error duplikasi username (MySQL error code for duplicate entry is 1062)
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Username sudah terdaftar.' });
        }
        return res.status(500).json({ message: 'Terjadi kesalahan saat registrasi.' });
      }
      res.status(201).json({ message: 'Registrasi berhasil', id: result.insertId });
    });
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Gagal logout' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout berhasil' });
  });
};

exports.getCurrentUser = (req, res) => {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

exports.Authenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

exports.Admin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};
