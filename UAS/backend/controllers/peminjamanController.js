const peminjamanModel = require('../models/peminjamanModel');

exports.getAllPeminjaman = (req, res) => {
  peminjamanModel.getAll((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getPeminjamanById = (req, res) => {
  peminjamanModel.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: 'Data peminjaman tidak ditemukan' });
    res.json(result[0]);
  });
};

exports.createPeminjaman = (req, res) => {
  peminjamanModel.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Peminjaman dicatat', id: result.insertId });
  });
};

exports.updatePeminjaman = (req, res) => {
  peminjamanModel.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Data peminjaman diperbarui' });
  });
};

exports.deletePeminjaman = (req, res) => {
  peminjamanModel.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Data peminjaman dihapus' });
  });
};
