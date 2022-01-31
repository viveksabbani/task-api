const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const User = mongoose.model('User',{
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const Task = mongoose.model('Task',{
    description: {
        type: String
    },
    isCompleted: {
        type: Boolean
    }
})

// const userInstance = new User({
//     name: "Vicky",
//     age: 22
// })

// userInstance.save().then((result)=>{
//     console.log(result);
// }).catch((err)=>{
//     console.log(err);
// })

//Task instance
// const taskInstance = new Task({
//     description: "Learn NodeJS",
//     isCompleted: false
// });

// taskInstance.save().then((result)=>{
//     console.log(result);
// }).catch((err)=>{
//     console.log(err);
// })