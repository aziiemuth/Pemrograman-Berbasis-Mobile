const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/profile', authController.getCurrentUser);
router.get('/test', (req, res) => {
  res.json({ message: 'Backend is running!', timestamp: new Date() });
});

module.exports = router;
