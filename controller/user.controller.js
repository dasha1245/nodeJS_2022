const {userService} = require('../service')

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllByParams({});

            res.json(users);

        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const user = req.user;

            res.json(user);

        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const userInfo = req.body;

            const newUser = await userService.createNew(userInfo);

            res.status(201).json(newUser);

        } catch (e) {
            next(e);
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const newUserInfo = req.body;

            const userToUpdate = await userService.updateById(userId, newUserInfo);

            res.status(201).json(userToUpdate);

        } catch (e) {
            next(e);
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

             const userToDelete = await userService.deleteById(userId);

            res.status(204).json('Deleted');

        } catch (e) {
            next(e);
        }
    }
}
