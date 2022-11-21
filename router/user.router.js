const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get(
    '/',
    userController.getAllUsers
);

router.get(
    '/:userId',
    userMiddleware.checkIsValidId,
    userMiddleware.checkIsUserExist,
    userController.getUserById
);

router.post(
    '/',
    userMiddleware.checkIsValidData,
    userController.createUser
);

router.delete(
    '/:userId',
    userMiddleware.checkIsValidId,
    userMiddleware.checkIsUserExist,
    userController.deleteUser
)

module.exports = router;