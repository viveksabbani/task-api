const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        require: true,
        trim: true,
        validate: (value)=>{
            if(value.length > 40){
                throw new Error('Description is too long!!!');
            }
        }
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;