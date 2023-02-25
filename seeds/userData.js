const { User } = require('../models');

  const seedUser = () => User.create({ // using create method instead of bulkcreate to launch the hooks for encryption
    id: 1,
    username: 'John',
    email: 'abc@abc.com',
    password: 'password123',
  });

module.exports = seedUser;