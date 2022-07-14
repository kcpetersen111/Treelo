let db = connect("mongodb://user:password@localhost:27017/admin");

db = db.getSiblingDB("productivityApp-mongo");

db.createUser({
  user: "new_user",
  pwd: "password",
  roles: [{ role: "readWrite", db: "productivityApp-mongo" }],
  passwordDigestor: "server",
});