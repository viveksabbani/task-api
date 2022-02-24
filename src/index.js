const express = require("express");
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/users',(req,res)=>{
    User.find({}).then(users=>{
        if(!users){
            return res.status(404).send('Users not found!!!');
        }
        res.send(users);
    }).catch(e=>{
        res.status(500).send(e.message);
    })
});

app.get('/users/:id',(req,res)=>{
    const _id = req.params.id;
    User.findById(_id).then(user=>{
        if(!user){
            return res.status(404).send('User not found!!!');
        }
        res.send(user);
    }).catch(e=>{
        res.status(500).send(e.message);
    })
});

app.get('/tasks',(req,res)=>{
    Task.find({}).then(tasks=>{
        if(!tasks)
            return res.status(404).send('No tasks are present. Add your tasks.');
        res.send(tasks);
    }).catch(e=>{
        res.status(500).send(e.message);
    })
});

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id;
    Task.findById(_id).then(task=>{
        if(!task)
            return res.status(404).send('Requested task is not present!!!');
        res.send(task);
    }).catch(e=>{
        res.status(500).send(e.message);
    })
});

app.post('/users',(req,res)=>{
    const newUser = new User(req.body);
    newUser.save().then((result)=>{
        res.status(201).send(result);
    }).catch((e)=>{
        res.status(400).send(e.message);
    });
});

app.post('/tasks',(req,res)=>{
    const newTask = new Task(req.body);
    newTask.save().then((result)=>{
        res.status(201).send(result);
    }).catch(e=>{
        res.status(400).send(e.message);
    })
});

app.listen(port,()=>{
    console.log("Node server started successfully at port: "+port);
});