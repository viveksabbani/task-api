const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    age: {
        type: Number,
        default: 0,
        validate: (value)=>{
            if(!(value >= 0 && value < 115)){
                throw new Error("Age entered is incorrect!!!");
            }
        }
    },
    email: {
        type: String,
        require: true,
        validate: (value)=>{
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!!!");
            }
        }
    },
    password: {
        type: String,
        trim: true,
        require: true,
        minlength: 7,
        validate: (value)=>{
            if(value.toLowerCase().includes("password")){
                throw new Error("Password can't contain password!!!");
            }
        }
    }
});
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})
const User = mongoose.model('User',userSchema);

module.exports = User;