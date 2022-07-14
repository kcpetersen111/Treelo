// const express = require('express');
// const express from
// import express from "express";
const express = require("express");
// import db from "model";
import * as db from "../persist/model";
// const db = require("../persist/model");

export const app = express();

// const cors = require ("cors");

// app.use(cors());
app.use(express.json());

app.use(express.static(`${__dirname}/../frontend-build`));

import { setUpAuth} from "./auth";
import { setUpSessionStore} from "./session"

setUpSessionStore(app);
setUpAuth(app);

app.post("/test",(req:any,res:any)=>{
    let garbage =  db;
    console.log("test");
    res.status(200).json("success");
});

// module.exports = app;
// export app;