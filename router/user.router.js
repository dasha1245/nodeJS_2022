const router = require('express').Router();

const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');


router.get('/', userController.getAllUsers);
router.post('/',
    userMiddleware.checkIsEmailUnique,
    userMiddleware.isNewUserValid,
    userController.createUser);

router.get('/:userId',
    userMiddleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically('userId', 'params', '_id'),
    userController.getUserById);
router.put('/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.isEditUserValid,
    userMiddleware.getUserDynamically('userId', 'params', '_id'),
    userController.updateUserById);
router.delete('/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.getUserDynamically('userId', 'params', '_id'),
    userController.deleteUserById);

module.exports = router;