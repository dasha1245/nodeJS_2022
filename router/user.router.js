const router = require('express').Router();

const {userController} = require('../controller');
const {userMiddleware} = require('../middleware')

router.get('/', userController.getAllUsers);
router.post('/',
    userMiddleware.checkIsValidName,
    userMiddleware.checkIsValidAge,
    userMiddleware.checkIsValidEmail,
    userController.createUser);

router.get('/:userId', userMiddleware.checkIsUserExists, userController.getUserById);
router.put('/:userId',
    userMiddleware.checkIsUserExists,
    userMiddleware.checkIsValidName,
    userMiddleware.checkIsValidAge,
    userMiddleware.checkIsValidEmail,
    userController.updateUserById);
router.delete('/:userId', userMiddleware.checkIsUserExists, userController.deleteUserById);


module.exports = router;