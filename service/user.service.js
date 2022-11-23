const User = require('../dataBase/User');

module.exports = {
    findAllByParams: async (filter = {}) => {
        return User.find(filter);
    },
    findOneByParams: async (filter = {}) => {
        return User.findOne(filter);
    },
    createNew: async (userInfo) => {
        return User.create(userInfo);
    },
    updateById: async (userId, newUserInfo) => {
        return User.findByIdAndUpdate(userId, newUserInfo, {new: true});
    },
    deleteById: async (userId) => {
        return User.deleteOne({ _id: userId});
    }
}