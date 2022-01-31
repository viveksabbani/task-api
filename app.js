// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
const { ObjectID } = require('bson');
const {MongoClient, ObjectId} = require('mongodb');

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL, {useNewUrlParser: true},(err,client)=>{
    if(err){
        console.log("Unable to connect to the database");
        return "Unable to connect to the database";
    }

    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: "Vivek",
    //     age: 23
    // },(err,result)=>{
    //     if(err)
    //         return console.log("Unable to insert the document!");
    //     console.log(result);
    // })
    // db.collection('tasks').insertOne({
    //     description: "Wake up early!",
    //     isCompleted: true
    // },(err,result)=>{
    //     if(err)
    //         return console.log("Unable to insert the document!");
    //     console.log(result);
    // })
    // db.collection('tasks').insertMany([
    //     {
    //         description: "Brush your teeth",
    //         isCompleted: false
    //     },
    //     {
    //         description: "Take a bath",
    //         isCompleted: false
    //     },
    //     {
    //         description: "Work",
    //         isCompleted: false
    //     }
    // ],(err,result)=>{
    //     if(err)
    //         return console.log(err);
    //     return console.log(result);
            
    // })

    // db.collection("tasks").findOne({_id: new ObjectId("61f74a8ebde113983c5c2e8d")},(err,result)=>{
    //     if(err)
    //         return console.log(err);
    //     return console.log(result);
    // })
    // db.collection("tasks").find({isCompleted: false}).toArray((err,result)=>{
    //     if(err)
    //         return console.log(err);
    //     return console.log(result);
    // });

    // db.collection('users').updateOne({
    //     _id: new ObjectID("61f74424fe52484c73941d4")
    // },{
    //     $set:{
    //         name: "Star Lord"
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((err)=>{
    //     console.log(err);
    // });
    // db.collection('users').updateOne({
    //     _id: new ObjectID("61f74424fe52484c73941d24")
    // },{
    //     $inc:{
    //         age: 2
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((err)=>{
    //     console.log(err);
    // });
    // db.collection('tasks').updateMany({},{
    //     $set:{
    //         isCompleted: true
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // db.collection('tasks').deleteOne({
    //     description: "Brush your teeth"
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    db.collection('users').deleteMany({
        age: 22
    }).then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    })
})