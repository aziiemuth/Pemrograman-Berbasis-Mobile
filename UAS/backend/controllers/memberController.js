const memberModel = require('../models/memberModel');

exports.getAllMembers = (req, res) => {
  memberModel.getAll((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getMemberById = (req, res) => {
  memberModel.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: 'Member tidak ditemukan' });
    res.json(result[0]);
  });
};

exports.createMember = (req, res) => {
  memberModel.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Member ditambahkan', id: result.insertId });
  });
};

exports.updateMember = (req, res) => {
  memberModel.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Member diperbarui' });
  });
};

exports.deleteMember = (req, res) => {
  memberModel.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Member dihapus' });
  });
};

