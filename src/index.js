const app = require('./app');

const port = process.env.PORT;

app.listen(port,()=>{
    console.log("Node server started successfully at port: "+port);
});
