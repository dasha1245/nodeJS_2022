const userDataBase = require('../dataBase/user.dataBase');
const {query} = require("express");

module.exports = {
    getAllByParams: async (filter = {}, query) => {
        const {limit = 10, page = 1, name} = query;

        if (name) {
            filter = {
                ...filter,
                name: new RegExp(name)
            }
        }

        const [users, count] = await Promise.all([
            userDataBase.find(filter).limit(limit).skip((+page - 1) * limit),
            userDataBase.count(filter)
        ])


        return {
            users,
            page: +page,
            count
        }

    },

    getOneByParams: async (filter = {}) => {
        return userDataBase.findOne(filter)
    },

    createNewUser: async (userInfo = '') => {
        return userDataBase.createWithHashPassword(userInfo);
    },

    deleteUser: async (userId) => {
        return userDataBase.deleteOne({_id: userId})
    },

    updateUser: async (userId, userInfo = {}) => {
        return userDataBase.findByIdAndUpdate(userId, userInfo, {new: true})
    }
}






