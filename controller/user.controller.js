const {userService, authService} = require('../service')

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllByParams();
            res.json(users);

        } catch (e) {
            next(e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const user = req.user
            res.json(user);

        } catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const userInfo = req.body;
            const hashedPassword = await authService.hashPassword(userInfo.password)

            const newUser = await userService.createNewUser({...userInfo, password: hashedPassword});

            res.status(201).json(newUser)

        } catch (e) {
            next(e)
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            await userService.deleteUser(userId)

            res.json(`User with id ${userId} was deleted`)

        } catch (e) {
            next(e)
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            const updatedInfo = req.body;
            const {userId} = req.params;

            const updatedUser = await userService.updateUser(userId, updatedInfo)
            res.json(updatedUser)

        } catch (e) {
            next(e)
        }
    }
};
