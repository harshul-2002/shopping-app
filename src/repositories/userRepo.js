const User = require('../models/User');

const createUser = (user, password) => User.register(user, password);

const save = (user) => {
    const newUser = new User(user);
    return newUser.save();
}

module.exports = {
    createUser,
    save
};
