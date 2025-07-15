const db = require('../config/api');

module.exports = {
  getAll: (cb) => db.query('SELECT * FROM loans', cb),
  getById: (id, cb) => db.query('SELECT * FROM loans WHERE id = ?', [id], cb),
  create: (data, cb) => {
    const { member_id, book_id, tanggal_pinjam, tanggal_kembali } = data;
    db.query(
      'INSERT INTO loans (member_id, book_id, tanggal_pinjam, tanggal_kembali) VALUES (?, ?, ?, ?)',
      [member_id, book_id, tanggal_pinjam, tanggal_kembali],
      cb
    );
  },
  update: (id, data, cb) => db.query('UPDATE loans SET ? WHERE id = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM loans WHERE id = ?', [id], cb)
};
