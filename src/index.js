const express = require("express");
const userRouter = require('./routers/user');
const taskRouter = require("./routers/task");
require('./db/mongoose');
const app = express();
const port = process.env.PORT;

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

app.listen(port,()=>{
    console.log("Node server started successfully at port: "+port);
});
