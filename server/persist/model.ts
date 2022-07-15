// import mongoose, { Mongoose } from "mongoose";

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            match:[
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
            require:true,
            unique: true,
        },
        name:{
            type: String,
            require:false,
        },
        password:{
            type: String,
            require:true,
        }
    }
);

const eventSchema = mongoose.Schema(
    {
        name:{
            type:String,
            require: true,
            default: "",
        },
        date:{
            type:Date,
            default: Date.now(),
        },
        done:{
            type:Boolean,
            default:false,
        },
        time:{
            type:Object,
            require:true,
        },
        category:{
            type:String,
            require:true,
        },
        ownerID:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
        }

    }
);

export const Events = mongoose.model("Events",eventSchema);
export const User = mongoose.model("User",userSchema);

// module.exports = {
//     Events,
//     User,
// };

// export const Events; 

// declare module "model" {
//     export = {
//             Events,
//             User,
//     }
// }

// declare module "Events" {
//     const Events:any;
//     export
// }