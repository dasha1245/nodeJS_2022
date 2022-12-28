const {userDataBase} = require('../dataBase');

module.exports = {
    getAllByParams: async (filter  = {}) => {
        const users = await userDataBase.find(filter)
        return users
    },
    getOneByParams: async (filter  = {}) =>{
        const user = await userDataBase.findOne(filter)
        return user
    },
    createNewUser: async (userInfo) => {
        const newUser = await userDataBase.create(userInfo);
        return newUser
    },
    deleteUser: async (userId) => {
        return userDataBase.deleteOne({_id: userId})
    },
    updateUser: async (userId, userInfo) => {
        const updatedUser = await userDataBase.findByIdAndUpdate(userId, userInfo, {new: true})
        return updatedUser
    }
}






