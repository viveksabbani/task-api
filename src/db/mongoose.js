const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');





// const userInstance = new User({
//     name: "Oldman",
//     age: 110,
//     email: "oldman@gmail.com"
// })
// const userInstance = new User({
//     name: "NewBorn",
//     email: "newborn@gmail.com",
//     password: "mypassword"
// })

// userInstance.save().then((result)=>{
//     console.log(result);
// }).catch((err)=>{
//     console.log(err);
// })

// Task instance
// const taskInstance = new Task({
//     description: "   Learn mongoose   ",
// });

// taskInstance.save().then((result)=>{
//     console.log(result);
// }).catch((err)=>{
//     console.log(err);
// })