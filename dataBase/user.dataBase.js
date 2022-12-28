const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, default: 0},
    email: {type: String, trim: true, required: true, lowercase: true, unique:true},
    password: {type: String, required:true}
}, {
    timestamps: true
});

module.exports = model('User', userSchema);