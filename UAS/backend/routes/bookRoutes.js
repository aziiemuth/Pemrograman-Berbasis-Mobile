const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../controllers/authController');

router.get('/', auth.Authenticated, bookController.getAllBooks);
router.get('/:id', auth.Authenticated, bookController.getBookById);
router.post('/', auth.Authenticated, auth.Admin, bookController.createBook);
router.put('/:id', auth.Authenticated, auth.Admin, bookController.updateBook);
router.delete('/:id', auth.Authenticated, auth.Admin, bookController.deleteBook);

module.exports = router;
