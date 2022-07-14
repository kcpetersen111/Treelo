const mongoose = require('mongoose');
// import totallyNotMongoose from "mongoose";
const db = mongoose.connection;

export const configureHandlers = function (callback:Function){
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
    db.once("error",(err:Error)=>{
        console.log("error connecting to the database", err);
    });
};

export const connect = function (user:string,password:string,host:string,port:string,db_name:string){
    // password = encodeURI(password);
    // const connectionString = `mongodb+srv://kcpetersen:${password}@cluster0.crhdmiu.mongodb.net/?retryWrites=true&w=majority`;
    const connectionString:string = encodeURI(`mongodb://${user}:${password}@${host}:${port}/${db_name}`);
    console.log(connectionString);
    mongoose.connect(connectionString,{
        // these options are now default
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
}

// export{};
// module.exports = {
//     configureHandlers,
//     connect,
// }