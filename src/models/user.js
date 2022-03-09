const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
});

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateJWTToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()},'myjwtsecret');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login!');
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Unable to login!');
    }
    return user;
}

userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})
const User = mongoose.model('User',userSchema);

module.exports = User;