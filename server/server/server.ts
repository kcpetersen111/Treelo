
// const express = require("express");
import express, {Request, Response} from 'express';

import {User, Cards, Containers, Boards, Contact} from "../persist/model";
// const db = require("../persist/model");
const bcrypt = require('bcrypt');

export const app = express();

const cors = require ("cors");

// const allowedOrgins = ["http://localhost:8080","https://kcpetersen111.github.io"]

app.use(cors({origin:"https://kcpetersen111.github.io*",
                credentials:true,
            }));
// app.use(cors({origin:"http://localhost:8080",credentials:true}));
// app.use(cors());
app.use(express.json());
// const frontendFiles:string = `${__dirname}/frontend-build`;
// app.use(express.static(frontendFiles));

import { setUpAuth} from "./auth";
import { setUpSessionStore} from "./session"

setUpSessionStore(app);
setUpAuth(app);

// app.get("/",(req:Request,res:Response)=>{
//     res.sendFile(`${frontendFiles}/index.html`);
// });

app.post("/users", async (req:Request,res:Response)=>{
    if(req.body.username == undefined || req.body.password == undefined){
        res.status(400).json({message:"Email and password must be defined"});
        return;
    }

    // const salt = bcrypt.genSalt(100);
    let pword = await bcrypt.hash(req.body.password, 12);

    try {
        let user = await User.create({
            name:    req.body.name,
            username: req.body.username,
            password: pword,
        });
        res.status(201).json(user);
    }catch(err){
        res.status(500).json({
            message:"post request failed to create user",
            error:err,
        });
    }
});

app.patch("/users", async (req:Request, res:Response)=>{

    if(!req.user){
        res.status(401).json({message:"Not logged in"});
        return;
    }
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
        return;
    }
    if(!user){
        res.status(404).json({message:"page does not exist"});
        return;
    }
    let newUser = {
        username:req.body.username,
        name:req.body.name,
        password:req.body.password,
    }
    
    try {
        user = await User.findByIdAndUpdate(user.id,newUser,{new:true}).select("-password");
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
        return;
    }
    res.status(200).json(user);
});

app.post("/contact",async (req:Request, res:Response) => {
    let contact;
    try {
        contact = await Contact.create({
            first: req.body.first,
            last:  req.body.last,
            email: req.body.email,
            description: req.body.description,
        });
    } catch (error) {
        res.status(500).json(error);
        return;
    }
    res.status(201).json(contact);
});

import {cardSetUp} from "./cards";
cardSetUp(app);

import {containerSetUp} from "./container";
containerSetUp(app);

import { boardSetUp } from "./board";
import { reduceEachTrailingCommentRange } from 'typescript';
boardSetUp(app);


// module.exports = app;
// export app;
