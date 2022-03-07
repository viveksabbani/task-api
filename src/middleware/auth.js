const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = async (req,res,next) => {
    try{
        const token = req.header('authorization').replace('Bearer ','');
        const data = jwt.verify(token,'myjwtsecret');
        const user = await User.findOne({_id: data._id,'tokens.token':token});
        if(!user){
            throw new Error();
        }
        req.user = user;
        next();
    }
    catch(e){
        console.log(e.message);
        res.status(401).send('Please authenticate!');
    }
}

module.exports = auth;