// import mongoose, { Mongoose } from "mongoose";

import { any } from "webidl-conversions";

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
// //container schema
// // similar to the forum app
// //a

// board -> container -> card
// a board will be a more genral consept like a group project or a school class
// a container will be a more specific subsection of the board think working on blank or completed assignments
// an card will be a specific item think assignment 4 or building a specific resource


// const boardSchema = mongoose.Schema({
//     creatorID:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true,
//     },
//     boardName:{
//         type:String,required:true,default:"",
//     },
//     description:{
//         type:String,required:true,default:"",
//     },
//     container:{
//         // a list of container ids
//         type:[mongoose.Types.ObjectId], required:true, default:[],
//     },
// });

// const containerSchema = mongoose.Schema({
//     //this probably should not matter or should be changed to an array
//     creatorID:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true,
//     },
//     containerName:{
//         type: String,required:true,default:"",
//     },
//     description:{
//         type:String,required:true,default:"",
//     },
//     cards:{
//         //a list of card ids
//         type:[mongoose.Types.ObjectId],required: true,default:[],
//     },
// });

const cardSchema = mongoose.Schema(
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
        //I think this is unNeeded
        creatorID:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
        }

    }
);

const containerSchema = mongoose.Schema({
    //this probably should not matter or should be changed to an array
    creatorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type: String,required:true,default:"",
    },
    description:{
        type:String,required:true,default:"",
    },
    cards:{
        //a list of event ids
        type:[mongoose.Types.ObjectId],required: true,default:[],
    },
});

const boardSchema = mongoose.Schema({
    creatorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,required:true,default:"",
    },
    description:{
        type:String,required:true,default:"",
    },
    container:{
        //a list of container ids
        type:[mongoose.Types.ObjectId],required:true,default:[],
    },
});
//middle ware
boardSchema.pre('remove',function(this:any,next:Function){
    
    this.populate('container');
    this.container.forEach((element:any) => {
        element.populate('cards')
        element.cards.forEach((card:any)=>{
            card.remove();
        });
        element.remove();
    });

    next();
});


export const Cards = mongoose.model("Cards",cardSchema);
export const Containers = mongoose.model("Containers",containerSchema);
export const Boards = mongoose.model("Boards",boardSchema);
export const User = mongoose.model("User",userSchema);

// module.exports = {
//     Cards,
//     User,
// };

// export const Cards;

// declare module "model" {
//     export = {
//             Cards,
//             User,
//     }
// }

// declare module "Cards" {
//     const Cards:any;
//     export
// }