

const mongoUser:string = 'new_user';
const password:string = 'password';
const host:string = 'localhost';
const mongo_port:string = '27017';
const db_name:string = 'productivityApp-mongo';
const httpPort:string = process.env.PORT || '8081';
// const session:string = "secretpassword";

module.exports = {
    mongoUser,
    password,
    host,
    mongo_port,
    db_name,
    httpPort,
    // session,
}