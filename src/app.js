const express = require("express");
const userRouter = require('./routers/user');
const taskRouter = require("./routers/task");
require('./db/mongoose');
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(express.static('public'));


app.get("/",(req,res)=>{
    try{
        res.sendFile('index.html');
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


module.exports = app;