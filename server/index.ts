// const app = require('./server/server');

const db = require('./persist/mongo');
// import * as db from "./persist/mongo"
import {app} from "./server/server";
// import app from "./server/server";
const config = require("./config");
// let test :string = "hello world";
// console.log(test);
db.configureHandlers(()=>{
    app.listen(config.httpPort,()=>{
        console.log(`Server is now listening on ${config.httpPort}`);
    })
});

db.connect(config.user, config.password, config.host, config.mongo_port, config.db_name);

