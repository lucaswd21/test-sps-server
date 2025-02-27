const users = [
    {
      id: 1,
      name: 'admin',
      email: 'admin@spsgroup.com.br',
      type: 'admin',
      password: '1234'
    }
  ];
  
  function getAllUsers() {
    return users;
  }
  
  function getUserByEmail(email) {
    return users.find((user) => user.email === email);
  }
  
  function getUserById(id) {
    return users.find((user) => user.id === Number(id));
  }
  
  function createUser(userData) {
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, ...userData };
    users.push(newUser);
    return newUser;
  }
  
  function updateUser(id, updatedData) {
    const userIndex = users.findIndex((u) => u.id === Number(id));
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };
      return users[userIndex];
    }
    return null;
  }
  
  function deleteUser(id) {
    const userIndex = users.findIndex((u) => u.id === Number(id));
    if (userIndex !== -1) {
      const deleted = users.splice(userIndex, 1);
      return deleted[0];
    }
    return null;
  }
  
  module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  };
  