const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const {
  signIn,
  createUserController,
  getUsers,
  getUserByIdController,
  updateUserController,
  deleteUserController
} = require('../controllers/userController');

router.post('/signin', signIn);

router.use(authMiddleware);

router.get('/users', getUsers);
router.get('/users/:id', getUserByIdController);
router.post('/users', createUserController);
router.put('/users/:id', updateUserController);
router.delete('/users/:id', deleteUserController);

module.exports = router;
