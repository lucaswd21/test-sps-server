const jwt = require('jsonwebtoken');
const {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../models/userModel');

const SECRET = process.env.JWT_SECRET || 'spsgroup-secret-token';

async function signIn(req, res) {
  const { email, password } = req.body;
  const user = getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: 'Usuário não existe' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      type: user.type
    },
    SECRET,
    { expiresIn: '1h' }
  );

  return res.json({ token });
}

async function createUserController(req, res) {
  const { name, email, type, password } = req.body;

  const existing = getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'E-mail já cadastrado' });
  }

  const newUser = createUser({ name, email, type, password });
  return res.status(201).json(newUser);
}

async function getUsers(req, res) {
  const users = getAllUsers();
  return res.json(users);
}

async function getUserByIdController(req, res) {
  const { id } = req.params;
  const user = getUserById(id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  return res.json(user);
}

async function updateUserController(req, res) {
  const { id } = req.params;
  const { name, email, type, password } = req.body;

  const user = getUserById(id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  if (email && email !== user.email) {
    const another = getUserByEmail(email);
    if (another) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }
  }

  const updated = updateUser(id, { name, email, type, password });
  return res.json(updated);
}

async function deleteUserController(req, res) {
  const { id } = req.params;
  const deleted = deleteUser(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  return res.json(deleted);
}

module.exports = {
  signIn,
  createUserController,
  getUsers,
  getUserByIdController,
  updateUserController,
  deleteUserController
};
