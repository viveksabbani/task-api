const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require(path.resolve('src/models/user.js'));
const testUserId = new mongoose.Types.ObjectId();

const testUser = {
    _id: testUserId,
    name: 'Vivek',
    email : 'vsabb@gmail.com',
    password: 'tennismaster123',
    tokens: [{
        token: jwt.sign({_id: testUserId}, process.env.JWT_SECURE_STRING)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(testUser).save();
}

module.exports = {testUser, testUserId, setupDatabase}