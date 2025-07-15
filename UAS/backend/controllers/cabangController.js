const cabangModel = require('../models/cabangModel');

exports.getAllCabang = (req, res) => {
  cabangModel.getAll((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getCabangById = (req, res) => {
  cabangModel.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: 'Cabang tidak ditemukan' });
    res.json(result[0]);
  });
};

exports.createCabang = (req, res) => {
  cabangModel.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Cabang ditambahkan', id: result.insertId });
  });
};

exports.updateCabang = (req, res) => {
  cabangModel.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Cabang diperbarui' });
  });
};

exports.deleteCabang = (req, res) => {
  cabangModel.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Cabang dihapus' });
  });
};
