const {Schema, model} = require('mongoose');

const authService = require('../service/auth.service');

const userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, default: 0},
    email: {type: String, trim: true, required: true, lowercase: true, unique: true},
    password: {type: String, required: true}
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

userSchema.virtual('fullName').get(function (){
    return `${this.name} Cherkasova`
})

userSchema.statics = { // for schema // THIS = MODEL
    async createWithHashPassword(userObject = {}) {
        const hashPassword = await authService.hashPassword(userObject.password);

        return this.create({ ...userObject, password: hashPassword });
    }}

userSchema.methods = { // for single record
    async comparePasswords(password){
        await authService.comparePasswords(this.password, password)
    }
}

module.exports = model('User', userSchema);