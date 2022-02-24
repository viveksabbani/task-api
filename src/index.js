const express = require("express");
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/users',(req,res)=>{
    User.find({}).then(users=>{
        if(!users){
            res.status(404).send();
        }
        res.send(users);
    }).catch(e=>{
        res.status(500).send(e.message);
    })
})

app.get('/users/:id',(req,res)=>{
    const _id = req.params.id;
    User.findById(_id).then(user=>{
        if(!user){
            res.status(404).send('User not found!!!');
        }
        res.send(user);
    }).catch(e=>{
        res.status(500).send(e.message);
    })
})

app.post('/users',(req,res)=>{
    const newUser = new User(req.body);
    newUser.save().then((result)=>{
        res.status(201).send(result);
    }).catch((e)=>{
        res.status(400).send(e.message);
    });
})

app.post('/tasks',(req,res)=>{
    const newTask = new Task(req.body);
    newTask.save().then((result)=>{
        res.status(201).send(result);
    }).catch(e=>{
        res.status(400).send(e.message);
    })
})

app.listen(port,()=>{
    console.log("Node server started successfully at port: "+port);
})