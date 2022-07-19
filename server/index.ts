// const app = require('./server/server');

const db = require('./persist/mongo');
import mongoose from "mongoose";
// import * as db from "./persist/mongo"
import {app} from "./server/server";
// import app from "./server/server";
const config = require("./config");

declare global {
    namespace Express {
      // tslint:disable-next-line:no-empty-interface
    //   interface AuthInfo {}
      // tslint:disable-next-line:no-empty-interface
      interface User {
          username:string;
          email:string;
          id:mongoose.Schema.Types.ObjectId; 
      }
   }
}


db.configureHandlers(()=>{
    app.listen(config.httpPort,()=>{
        console.log(`Server is now listening on ${config.httpPort}`);
    })
});

db.connect(config.mongoUser, config.password, config.host, config.mongo_port, config.db_name);

