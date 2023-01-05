const s3Service = require('../service/s3.service');
const userService = require('../service/user.service');

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
            await userService.createNewUser(userInfo)

            res.status(201).json('ok')

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
    },
    uploadAvatar: async (req, res, next) => {
        try {
            const {user:{_id}, files} = req;

            const uploadedInfo = await s3Service.uploadPublicFile(files.Avatar, 'user', _id);

            const updatedUser = await userService.updateUser(_id, {avatar: uploadedInfo.Location})


            res.json('Successful uploading!')
        } catch (e) {
            next(e)
        }
    }
};
