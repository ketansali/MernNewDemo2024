const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase : true,
        unique : true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},{timestamps:true});

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return next();
    this.password = await bycrypt.hash(this.password,10);
});

userSchema.methods = {
    authenticated: async function(password){
        return await bycrypt.compare(password, this.password)
    }
}

module.exports = mongoose.model('users',userSchema);
