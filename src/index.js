const express = require("express");
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/users',async (req,res)=>{
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

app.get('/users/:id',async (req,res)=>{
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

app.get('/tasks',async (req,res)=>{
    try{
        const tasks = await Task.find({});
        if(!tasks)
            return res.status(404).send('No tasks are present. Add your tasks.');
        res.send(tasks);
    }
    catch(e){
        res.status(500).send(e.message);
    }
    // Task.find({}).then(tasks=>{
    //     if(!tasks)
    //         return res.status(404).send('No tasks are present. Add your tasks.');
    //     res.send(tasks);
    // }).catch(e=>{
    //     res.status(500).send(e.message);
    // })
});

app.get('/tasks/:id',async (req,res)=>{
    try{
        const _id = req.params.id;
        const task = await Task.findById(_id);
        if(!task)
            return res.status(404).send('Requested task is not present!!!');
        res.send(task);
    }
    catch(e){
        res.status(500).send(e.message);
    }
    // const _id = req.params.id;
    // Task.findById(_id).then(task=>{
    //     if(!task)
    //         return res.status(404).send('Requested task is not present!!!');
    //     res.send(task);
    // }).catch(e=>{
    //     res.status(500).send(e.message);
    // })
});

app.post('/users',async (req,res)=>{
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

app.post('/tasks',async (req,res)=>{
    try{
        const newTask = new Task(req.body);
        const result = await newTask.save();
        res.status(201).send(result);
    }
    catch(e){
        res.status(400).send(e.message);
    }
    // const newTask = new Task(req.body);
    // newTask.save().then((result)=>{
    //     res.status(201).send(result);
    // }).catch(e=>{
    //     res.status(400).send(e.message);
    // })
});

app.patch('/user/:id',async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','age','email','password'];
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update));
    try{
        if(!isUpdateValid) throw new Error('Invalid fields are tried to be updated.');
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true});
        if(!user) res.status(404).send('User not found!!!');
        res.send(user);
    }
    catch(e){
        res.status(400).send(e.message);
    }
});

app.patch('/task/:id', async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','isCompleted'];
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update));
    try{
        if(!isUpdateValid) throw new Error('Invalid fields were tried to be updated.');
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!task) res.status(404).send('task not found!!!');
        res.send(task);
    }
    catch(e){
        res.status(400).send(e.message);
    }
})

app.listen(port,()=>{
    console.log("Node server started successfully at port: "+port);
});