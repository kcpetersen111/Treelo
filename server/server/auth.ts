//this file is the one that will manage authentication

import mongoose from "mongoose";
// import * as passport from "passport";
import passport from "passport";
// import * from "@types/passport"
// const passport = require("passport");

const LocalStrategy = require('passport-local');
// const { password } = require("../config");
const {User} = require("../persist/model");

// export type userType = {
//     email?: string;
//     username?: string;
//     id?: mongoose.Schema.Types.ObjectId;
// }

passport.use(
    new LocalStrategy( async (username:string,password:string,done:Function)=>{
    let user:typeof User;
    try{
        user = await User.findOne({username:username, password:password});
        if(!user){
            //this did not exist in the db
            return done(null,false);
        }
        //successful attempt
        return done(null, user);
    } catch(err){
        //this is for errors
        return done(err);
    }
    })
);

export const setUpAuth = function(app:any){
    app.use(passport.initialize());
    app.use(passport.authenticate("session"));

    passport.serializeUser(function(user:any, cb:Function){
        cb(null,{id:user._id, name:user.name,username:user.username});
    });
    
    passport.deserializeUser(function(user:any,cb:Function){
        return cb(null,user);
    });

    app.post("/session",passport.authenticate("local"), (req:any,res:any)=>{
        res.status(201).json({message:"success in creating session"});
    });

    app.get("/session",(req:any,res:any)=>{
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        res.status(200).json({message:"authed"});
    });
};

// module.exports = setUpAuth;