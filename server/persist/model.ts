const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email:{
            type: String,
            match:[
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
            require:true,
            unique: true,
        },
        username:{
            type: String,
            require:true,
        },
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

    }
);

const Events = mongoose.model("Events",eventSchema);
const User = mongoose.model("User",userSchema);

module.exports = {
    Events,
    User,
};