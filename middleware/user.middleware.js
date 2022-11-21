const {fileServices} = require('../service');
const APIError = require('../error/API.error')

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try{
            const {userId} = req.params;
            const users = await fileServices.reader();
            const user = users.find((user) => user.id === +userId);

            if(!user){
                throw new APIError("User not found", 404);
            }

            req.users = users;
            req.user = user;
            next()
        } catch (e) {
            next(e);
        }
},
    checkIsValidId: (req, res, next) => {
        try {
            const {userId} = req.params;
            if (userId <= 0 || Number.isNaN(+userId)){
                throw new APIError("Invalid user Id", 400)
            }
            next()
        }catch (e) {
            next(e)
        }

    },
    checkIsValidData: (req, res, next) => {
        try{
            const {name, age} = req.body;
            if(!age || age < 0 || age > 103 || Number.isNaN(+age)){
                throw new APIError('Invalid data', 400)
            }
            if(!name || name.length < 2 || typeof name !== "string"){
                throw new APIError('Invalid data', 400)
            }
            next()
        } catch (e) {
            next(e)
        }
    }
}