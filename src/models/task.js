const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task',{
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
    isCompleted: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Task;