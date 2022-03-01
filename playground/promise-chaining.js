require('../src/db/mongoose');
const Task = require('../src/models/task');

const _id = "61f7828f74a57c17295a0ca5";

// Task.findByIdAndRemove(_id).then(task=>{
//     console.log(task);
// }).catch(e=>console.log(e));

// Task.find({}).then(tasks=>{
//     tasks.forEach(task=>{
//         console.log(task.description);
//     })
//     return Task.countDocuments({isCompleted: false});
// }).then(completedTasks=>{
//     // completedTasks.forEach(task=>{
//     //     console.log(task.description);
//     // })
//     console.log(completedTasks);
// }).catch(e=>{
//     console.log(e);
// })

const deleteTaskAndCount = async(_id) =>{
    const removedTask = await Task.findByIdAndDelete(_id);
    const count = await Task.countDocuments({isCompleted: false});
    return {count, removedTask};
}

deleteTaskAndCount('62172cad4f240b919b16b041').then(result=>{
    console.log(`removedTask: ${result.removedTask.description} and unfinished task count: ${result.count}`);
}).catch(e=>{
    console.log(e);
})