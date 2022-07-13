// let mongoose = require('mongoose');
import mongoose from "mongoose";
const db = mongoose.connection;

function configureHandlers(callback:Function){
    db.once("connecting",()=>{
        console.log("connecting to the database");
    });
    db.once("connected",()=>{
        console.log("connected to the database");
    });
    db.once("open",()=>{
        console.log("connection to the database is open");
        callback();
    });
    db.once("error",(err)=>{
        console.log("error connecting to the database", err);
    });
};

function connect(user:string,password:string,host:string,port:string,db_name:string){
    // password = encodeURI(password);
    // const connectionString = `mongodb+srv://kcpetersen:${password}@cluster0.crhdmiu.mongodb.net/?retryWrites=true&w=majority`;
    const connectionString:string = encodeURI(`mongodb://${user}:${password}@${host}:${port}/${db_name}`);
    console.log(connectionString);
    mongoose.connect(connectionString,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
}

module.exports = {
    configureHandlers,
    connect,
}