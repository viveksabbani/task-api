const mongoose = require("mongoose");
const validator = require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const User = mongoose.model('User',{
    name: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate: (value)=>{
            if(!(value >= 0 && value < 115)){
                throw new Error("Age entered is incorrect!!!");
            }
        }
    },
    email: {
        type: String,
        validate: (value)=>{
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!!!");
            }
        }
    }
})

// const Task = mongoose.model('Task',{
//     description: {
//         type: String
//     },
//     isCompleted: {
//         type: Boolean
//     }
// })

// const userInstance = new User({
//     name: "Oldman",
//     age: 110,
//     email: "oldman@gmail.com"
// })
const userInstance = new User({
    name: "NewBorn",
    email: "newborn@gmail.com"
})

userInstance.save().then((result)=>{
    console.log(result);
}).catch((err)=>{
    console.log(err);
})

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