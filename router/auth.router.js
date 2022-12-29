const router = require('express').Router();

const {authController} = require('../controller');
const {authMiddleware, userMiddleware} = require('../middleware');

router.post(
    '/login',
    authMiddleware.isBodyValid,
    userMiddleware.getUserDynamically('email', 'body'),
    authController.login);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/logoutAll', authMiddleware.checkAccessToken, authController.logoutAll);

module.exports = router;