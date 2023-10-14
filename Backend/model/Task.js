const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt: {
         type: Date,
         default: Date.now
     }
})

module.exports = Blog = mongoose.model("Task",TaskSchema);
