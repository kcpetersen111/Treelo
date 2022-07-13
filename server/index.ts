const app = require('./server/server');
const db = require('./persist/mongo');
const config = require("./config");
// let test :string = "hello world";
// console.log(test);
db.configureHandlers(app.listen(8080,()=>{
    console.log("test success");
}));
db.connect(config.user, config.password, config.host, config.mongo_port, config.db_name);

