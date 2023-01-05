const userDataBase = require('../dataBase/user.dataBase');

module.exports = {
    getAllByParams: async (filter  = {}) => {
        return  userDataBase.find(filter)

    },

    getOneByParams: async (filter  = {}) =>{
        return userDataBase.findOne(filter)
    },

    createNewUser: async (userInfo ='') => {
        return userDataBase.createWithHashPassword(userInfo);
    },

    deleteUser: async (userId) => {
        return userDataBase.deleteOne({_id: userId})
    },

    updateUser: async (userId, userInfo={}) => {
        return userDataBase.findByIdAndUpdate(userId, userInfo, {new: true})
    }
}






