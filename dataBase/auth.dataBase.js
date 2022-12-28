const {Schema, model} = require('mongoose')

const authSchema = new Schema({
    _user_id: {type:Schema.Types.ObjectId, ref: 'User'},
    accessToken: {type: String},
    refreshToken: {type: String}
});

module.exports = model('Auth', authSchema);