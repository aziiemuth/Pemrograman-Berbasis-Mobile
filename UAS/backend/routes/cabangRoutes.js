const express = require('express');
const router = express.Router();
const cabangController = require('../controllers/cabangController');
const auth = require('../controllers/authController');

router.get('/', auth.Authenticated, cabangController.getAllCabang);
router.get('/:id', auth.Authenticated, cabangController.getCabangById);
router.post('/', auth.Authenticated, auth.Admin, cabangController.createCabang);
router.put('/:id', auth.Authenticated, auth.Admin, cabangController.updateCabang);
router.delete('/:id', auth.Authenticated, auth.Admin, cabangController.deleteCabang);

module.exports = router;
