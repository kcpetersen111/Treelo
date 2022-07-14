// this is the file that will set up the session

const session = require("express-session");
// const config = require("../config");
// import config from "../config"
const sessionPass:string = "secretPassword"

const setUpSessionStore = function(app:any){
    app.use(
        session({
            secret:sessionPass,
            resave: false,
            saveUninitialized: false,
    }));
}

module.exports = setUpSessionStore;