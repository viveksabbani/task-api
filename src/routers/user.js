const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/auth');
const userRouter = express.Router();

//GET Routes
userRouter.get('/users',auth,async (req,res)=>{
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

userRouter.get('/users/me',auth,async (req,res)=>{
    try{
        res.send(req.user);
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

// userRouter.get('/users/:id',async (req,res)=>{
//     try{
//         const _id = req.params.id;
//         const user = await User.findById(_id);
//         if(!user){
//             return res.status(404).send('User not found!!!');
//         }
//         res.send(user);
//     }
//     catch(e){
//         res.status(500).send(e.message);
//     }
//     // User.findById(_id).then(user=>{
//     //     if(!user){
//     //         return res.status(404).send('User not found!!!');
//     //     }
//     //     res.send(user);
//     // }).catch(e=>{
//     //     res.status(500).send(e.message);
//     // })
// });


//POST Routes
userRouter.post('/users',async (req,res)=>{
    const newUser = new User(req.body);
    try{
        const result = await newUser.save();
        const token = await newUser.generateJWTToken();
        res.status(201).send({result,token});    
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

userRouter.post('/user/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateJWTToken();
        res.send({user,token});
    }
    catch(e){
        res.status(400).send(e.message);
    }
    
})

userRouter.post('/user/logout',auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((tokenObj)=> tokenObj.token !== req.token);
        await req.user.save();
        res.send('User logged out.')
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

userRouter.post('/user/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send('All user sessions terminated');
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req,file,cb)=>{
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload only images!'));
        }
        cb(null,true);
    }
});

userRouter.post('/users/me/avatar', auth, upload.single('avatar'), (req,res)=>{
    res.send();
},(err,req,res,next)=>{
    res.status(400).send({error: err.message})
})

//PATCH Routes
userRouter.patch('/user/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','age','email','password'];
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update));
    try{
        if(!isUpdateValid) throw new Error('Invalid fields are tried to be updated.');
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true}); mongoose middleware hooks won't work for findByIdAndUpdate method as it is old.
        const user = req.user;
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        // if(!user) res.status(404).send('User not found!!!');
        res.send(user);
    }
    catch(e){
        res.status(400).send(e.message);
    }
});


//DELETE Routes
userRouter.delete('/user/me',auth,async(req,res)=>{
    try{
        // const deletedUser = await User.findByIdAndDelete(req.params.id);
        // if(!deletedUser) res.status(404).send('user not found!!!');
        req.user.delete();
        res.send(req.user);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports = userRouter;