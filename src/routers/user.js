const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();

userRouter.get('/users',async (req,res)=>{
    try{
        const users = await User.find({});
        if(!users){
            return res.status(404).send('Users are not found.');
        }
        res.send(users);
    }
    catch(e){
        res.status(500).send(e.message);
    }
    // User.find({}).then(users=>{
    //     if(!users){
    //         return res.status(404).send('Users not found!!!');
    //     }
    //     res.send(users);
    // }).catch(e=>{
    //     res.status(500).send(e.message);
    // })
});

userRouter.get('/users/:id',async (req,res)=>{
    try{
        const _id = req.params.id;
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send('User not found!!!');
        }
        res.send(user);
    }
    catch(e){
        res.status(500).send(e.message);
    }
    // User.findById(_id).then(user=>{
    //     if(!user){
    //         return res.status(404).send('User not found!!!');
    //     }
    //     res.send(user);
    // }).catch(e=>{
    //     res.status(500).send(e.message);
    // })
});

userRouter.post('/users',async (req,res)=>{
    try{
        const newUser = new User(req.body);
        const result = await newUser.save();
        res.status(201).send(result);    
    }
    catch(e){
        res.status(500).send(e.message);
    }
    // const newUser = new User(req.body);
    // newUser.save().then((result)=>{
    //     res.status(201).send(result);
    // }).catch((e)=>{
    //     res.status(400).send(e.message);
    // });
});

userRouter.patch('/user/:id',async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','age','email','password'];
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update));
    try{
        if(!isUpdateValid) throw new Error('Invalid fields are tried to be updated.');
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true}); mongoose middleware hooks won't work for findByIdAndUpdate method as it is old.
        const user = await User.findById(req.params.id);
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        if(!user) res.status(404).send('User not found!!!');
        res.send(user);
    }
    catch(e){
        res.status(400).send(e.message);
    }
});

userRouter.delete('/user/:id',async(req,res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) res.status(404).send('user not found!!!');
        res.send(deletedUser);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports = userRouter;