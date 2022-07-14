// const express = require('express');
// const express from
// import express from "express";
const express = require("express");
// import db from "model";
import * as db from "../persist/model";
// const db = require("../persist/model");
export const app = express();

app.post("/test",(req:any,res:any)=>{
    let garbage =  db;
    console.log("test");
    res.status(200).json("success");
});

// module.exports = app;
// export app;