const {userService} = require('../service')
const ApiError = require('../error/ApiError')

module.exports = {
    checkIsUserExists: async (req, res, next) => {
        try{
            const {userId} = req.params;

            const user = await userService.findOneByParams({_id: userId});

            if(!user) {
                throw new ApiError('User not found', 404)
            };

            req.user = user;
            next()
        } catch (e) {
            next(e)
        }
    },
    checkIsValidName: async (req, res, next) => {
        try{
            const {name} = req.body;

            if(!name || typeof name !== 'string' || name.length < 2) {
                throw new ApiError('Invalid name', 400);
            }

            next()

        } catch (e) {
            next(e);
        }
    },
    checkIsValidAge: async (req, res, next) => {
        try{
            const {age} = req.body;

            if(!age || Number.isNaN(+age) || age < 0) {
                throw new ApiError('Invalid age', 400);
            }

            next()

        } catch (e) {
            next(e);
        }
    },
    checkIsValidEmail: async (req, res, next) => {
        try{
            const {email} = req.body;

            if(!email || typeof email !== 'string' || email.length < 11 || !email.includes('@')) {
                throw new ApiError('Invalid email', 400);
            }

            next()

        } catch (e) {
            next(e);
        }
    },
}