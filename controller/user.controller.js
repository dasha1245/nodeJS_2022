const {fileServices} = require('../service')

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await fileServices.reader();
            res.json(users)
        } catch (e) {
            next(e);
        }
    },
    getUserById: (req, res, next) => {
        try{
            const user = req.user
            res.json(user)
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try{
            const userInfo = req.body;

            const users = await fileServices.reader();


            const newUser = {
                id: users[users.length-1].id + 1,
                name: userInfo.name,
                age: userInfo.age
            };

            users.push(newUser);
            await fileServices.writter(users);

            res.status(201).json(newUser);
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try{
            const {userId} = req.params;
            const users = await fileServices.reader();
            const indexUserToDelete = users.findIndex(user => user.id === +userId);
            users.splice(indexUserToDelete, 1);
            await fileServices.writter(users);
            res.json('Deleted')
        } catch (e) {
            next(e);
        }
    },
    // updateUser: async (req, res, next) => {
    //     try {
    //         const {name, age} = req.body;
    //         const userId = req.params;
    //         const users = await fileServices.reader();
    //         const userForUpdate = users.find(user => user.id === +userId);
    //         userForUpdate = [...userForUpdate, userForUpdate.name = name, userForUpdate.age = age];
    //
    //     } catch (e) {
    //
    //     }
    // }
}
