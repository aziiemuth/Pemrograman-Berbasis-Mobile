const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const auth = require('../controllers/authController');

router.get('/', auth.Authenticated, memberController.getAllMembers);
router.get('/:id', auth.Authenticated, memberController.getMemberById);
router.post('/', auth.Authenticated, auth.Admin, memberController.createMember);
router.put('/:id', auth.Authenticated, auth.Admin, memberController.updateMember);
router.delete('/:id', auth.Authenticated, auth.Admin, memberController.deleteMember);

module.exports = router;
