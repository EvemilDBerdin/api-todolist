const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const auth = require('../middlewares/auth');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


router.get('/profile', auth, userController.getProfile);

module.exports = router;