// const express = require('express');
// const express from
import express from "express";

const app = express();

app.post("/test",(req,res)=>{
    console.log("test");
    res.status(200).json("success");
});

module.exports = app;