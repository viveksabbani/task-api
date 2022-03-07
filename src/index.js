const express = require("express");
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRouter = require('./routers/user');
const taskRouter = require("./routers/task");
require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send('GET http method is disabled temporarily');
//     }else{
//         next();
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Maintenance under progress. Try again later.');
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//Password Encryption example
// const myFunction = async () =>{
//     const password = "somepassword";
//     const encrptedPassword = await bcrypt.hash(password,8);
//     console.log(password);
//     console.log(encrptedPassword);
//     console.log(await bcrypt.compare("somepassword",encrptedPassword));
// }

//JWT example
// const myFunction = async () => {
//     const token = await jwt.sign({username: 'sabbanivivek@gmail.com'},"mykey",{expiresIn: '5 hours'});
//     console.log(token);
//     const data = await jwt.verify(token,'mykey');
//     console.log(data);
// }

// myFunction();

app.listen(port,()=>{
    console.log("Node server started successfully at port: "+port);
});