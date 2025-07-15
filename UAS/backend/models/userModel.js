const db = require('../config/api');

module.exports = {
  findByUsername: (username, cb) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], cb);
  },
  createUser: (data, cb) => {
    const { username, password, role, id_anggota } = data;
    db.query(
      'INSERT INTO users (username, password, role, id_anggota) VALUES (?, ?, ?, ?)',
      [username, password, role, id_anggota],
      cb
    );
  }
};
