const { User } = require('../models');

const seedUser = async () => {
    await User.create({ // using create method instead of bulkcreate to launch the hooks for encryption
        username: 'John',
        email: 'abc@abc.com',
        password: 'password123',
    });
   await User.create({ // using create method instead of bulkcreate to launch the hooks for encryption
        username: 'Peter',
        email: 'abc1@abc.com',
        password: 'password123',
    });
};

module.exports = seedUser;