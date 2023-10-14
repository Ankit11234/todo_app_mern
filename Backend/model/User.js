const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,

    },
    password:{
        type: String,
        required:true,
        unique:true,
        minLength:6
    },
    tasks:[
        {type: mongoose.Types.ObjectId,
        ref:"Task",
        required:true,
        }
    ],

});

module.exports = User = mongoose.model("User",userSchema);

