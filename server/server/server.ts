
// const express = require("express");
import express, {Request, Response} from 'express';

import {User, Cards, Containers, Boards} from "../persist/model";
// const db = require("../persist/model");

export const app = express();

const cors = require ("cors");

app.use(cors({origin:"http://localhost:8080",credentials:true}));
app.use(express.json());

app.use(express.static(`${__dirname}/../frontend-build`));

import { setUpAuth} from "./auth";
import { setUpSessionStore} from "./session"

setUpSessionStore(app);
setUpAuth(app);

app.post("/users", async (req:Request,res:Response)=>{
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

import {cardSetUp} from "./cards";
cardSetUp(app);

import {containerSetUp} from "./container";
containerSetUp(app);

import { boardSetUp } from "./board";
boardSetUp(app);


// module.exports = app;
// export app;
