const express = require("express");
// const bcrypt = require('bcryptjs');
const userRouter = require('./routers/user');
const taskRouter = require("./routers/task");
require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// const myFunction = async () =>{
//     const password = "somepassword";
//     const encrptedPassword = await bcrypt.hash(password,8);
//     console.log(password);
//     console.log(encrptedPassword);
//     console.log(await bcrypt.compare("somepassword",encrptedPassword));
// }

// myFunction();

app.listen(port,()=>{
    console.log("Node server started successfully at port: "+port);
});