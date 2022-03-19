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
// const celsiusToFarenheit = (temperature) => {
//     return 1.8*temperature + 32;
// }

// const asyncCelsiusToFarenheit = async(temperature) => {
//     return new Promise((res,rej)=>{
//         setTimeout(() => {
//             if(temperature < -273) rej('Temperature is less than absolute zero!!!');
//             res(1.8*temperature+32);
//         },2000)
//     });
// }

// module.exports = {celsiusToFarenheit,asyncCelsiusToFarenheit};