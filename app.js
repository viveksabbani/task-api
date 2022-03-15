const {MongoClient, ObjectId} = require('mongodb');

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager-api";

MongoClient.connect(connectionURL, {useNewUrlParser: true},(err,client)=>{
    if(err){
        console.log("Unable to connect to the database");
        return "Unable to connect to the database";
    }

    const db = client.db(databaseName);
})