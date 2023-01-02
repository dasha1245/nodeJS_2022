const {Schema, model} = require('mongoose');

const ForgPassSchema = new Schema({
    _user_id: {type:Schema.Types.ObjectId, ref: 'User'},
    token: {type: String},
    tokenType: {type:String}
});

module.exports = model('ForgotPassword', ForgPassSchema)