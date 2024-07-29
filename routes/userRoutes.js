const express = require('express');
const upload = require('../config/upload');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserStatus,
  login,
} = require('../controllers/userController');

const router = express.Router();

router.post('/users', upload.single('img'), createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id',upload.single('img'), updateUser);
router.put('/users/status/:id', updateUserStatus);
router.delete('/users/:id', deleteUser);
router.post('/users/login', login);

module.exports = router;
