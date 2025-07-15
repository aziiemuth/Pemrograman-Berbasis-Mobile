const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanController');
const auth = require('../controllers/authController');

router.get('/', auth.Authenticated, peminjamanController.getAllPeminjaman);
router.get('/:id', auth.Authenticated, peminjamanController.getPeminjamanById);
router.post('/', auth.Authenticated, peminjamanController.createPeminjaman);
router.put('/:id', auth.Authenticated, peminjamanController.updatePeminjaman);
router.delete('/:id', auth.Authenticated, auth.Admin, peminjamanController.deletePeminjaman);

module.exports = router;
