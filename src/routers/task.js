const express = require('express');
const Task = require('../models/task');
const taskRouter = express.Router();

taskRouter.get('/tasks',async (req,res)=>{
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

taskRouter.get('/tasks/:id',async (req,res)=>{
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



taskRouter.post('/tasks',async (req,res)=>{
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



taskRouter.patch('/task/:id', async (req,res)=>{
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
});



taskRouter.delete('/task/:id', async(req,res)=>{
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask) res.status(404).send('Task not found!!!');
        res.send(deletedTask);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports = taskRouter;