// const express = require('express');
// const express from
import express from "express";
// import db from "model";
const db = require("../persist/model");
const app = express();

app.post("/test",(req,res)=>{
    console.log("test");
    res.status(200).json("success");
});

module.exports = app;