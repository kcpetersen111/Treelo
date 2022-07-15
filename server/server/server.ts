
// const express = require("express");
import express, {Request, Response} from 'express';

import {User, Events} from "../persist/model";
// const db = require("../persist/model");

export const app = express();

const cors = require ("cors");

app.use(cors());
app.use(express.json());

app.use(express.static(`${__dirname}/../frontend-build`));

import { setUpAuth} from "./auth";
import { setUpSessionStore} from "./session"

setUpSessionStore(app);
setUpAuth(app);


// app.post("/test",(req:any,res:any)=>{
//     let garbage =  db;
//     console.log("test");
//     res.status(200).json("success");
// });

app.post("/users", async (req:any ,res:any)=>{
    if(req.body.username == undefined || req.body.password == undefined){
        res.status(400).json({message:"Email and password must be defined"});
        return;
    }
    try {
        let user = await User.create({
            name:    req.body.name,
            username: req.body.username,
            password: req.body.password,  
        });
        res.status(201).json(user);
    }catch(err){
        res.status(500).json({
            message:"post request failed to create user",
            error:err,
        });
    }
});

//will need to be able to get all events
app.get("/events", async (req:Request, res:Response)=>{
    // console.log(typeof req.user);
    if(!req.user){
        res.status(401).json({message:"unauthed"});
        return;
    }
    let list:Array<Object>;
    try {
        list = await Events.find({ownerID: req.user.id}, "-password");
    } catch (error) {   
        console.log("error in retiving all events by a user ",error);
        res.status(500).json(error);
        return;
    }

    res.status(200).json(list);
});

//will need to be able to get events by id

//will need to be able to update events by id

//will need to be able to delete events by id

//will need to create an event
app.post("/events", async (req:Request, res:Response)=>{
    if(!req.user){
        res.status(401).json({message:"unauthed"});
        return;
    }
    let post;
    try{
        post = await Events.create({
            name: req.body.name,
            date: req.body.date,
            done: req.body.done,
            category: req.body.category,
            ownerID: req.user.id,
        });
    } catch(err){
        res.status(500).json(err);
        return;
    }
    res.status(201).json(post);
});
//will need to mark an event as complete by id

// module.exports = app;
// export app;