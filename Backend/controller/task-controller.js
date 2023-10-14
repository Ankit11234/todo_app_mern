const { json } = require("express");
const { default: mongoose } = require("mongoose");
// const task = require("../model/Task");
const User = require("../model/User");
const Task = require("../model/Task");

const getAlltasks = async(req,res,next)=>{


        let tasks;
      
        try {
          tasks = await Task.find().sort({Date:-1}).populate('user');
          // tasks.sort({Date:-1});
          
        } catch (error) {
          console.log(error);
        }
      
        if(!tasks){
          return res.status(400).json({message:"no task found"});
        }

       return res.status(200).json({user:tasks});
}

const addtasks=async(req,res,next)=>{

   const {description,title,user}=req.body;

   let existinguser;
   try {
    existinguser = await User.findById(user);
    
   } catch (error) {
    console.log(error);
   }
   if(!existinguser){
    return res.status(400).json({message:"no id found"});
   }

   const task = new Task({
       title,
       description,
       user,
   })
  
    try {
        const session = await mongoose.startSession();
        //  session.startTransaction();
        await task.save({session});

        existinguser.tasks.push(task);
        await existinguser.save({session});
        // await session.commitTransaction();
      
    } catch (error) {
      console.log(error);
      return res.status(500),json({message:error});
    }
  

   return res.status(200).json({task});
}


const updatetask = async(req,res,next)=>{
    const {description,title,user}=req.body;
    const id = req.params.id;
    let task;
    try {
        task = await Task.findByIdAndUpdate(id,{
            title,
            description,                      
        })
        task.save();
        
      } catch (error) {
        console.log(error);
      }

      if(!task){
        return res.status(500).json({message:"unable to update task"});
      }
      return res.status(200).json({message:"successfully updted tasks"});
}
const deletetask = async(req,res,next)=>{
    // const {description,title,image,user}=req.body;
    const id = req.params.id;
    let task;
    try {
        task = await Task.findByIdAndRemove(id).populate('user');
        await task.user.tasks.pull(task);
       await  task.user.save();
        
      } catch (error) {
        console.log(error);
      }

      if(!task){
        return res.status(500).json({message:"unable to delete task"});
      }
      return res.status(200).json({message:"successfully deleted task"});
}

const getById= async(req,res,next)=>{

    let tasks;
    const id = req.params.id;

      
        try {
          tasks = await Task.findById(id);
         await  tasks.save();
        } catch (error) {
          console.log(error);
        }
      
        if(!tasks){
          return res.status(400).json({message:"no task found"});
        }

       return res.status(200).json({tasks});
}

const getByuserId = async(req,res,next)=>{
    const id = req.params.id;
    let usertask;
    // console.log("id is ",id);
    try {
        usertask = await User.findById(id).populate(('tasks'));
        // .populate("tasks");
        // usertask.save();
        
    } catch (error) {
        return console.log(error);
    }
    if(!usertask){
        return res.status(400).json({message:"No Task Found"});
    }

     return res.status(200).json({tasks:usertask});
}


module.exports={
    getAlltasks,
    addtasks,
    updatetask,
    deletetask,
    getById,
    getByuserId
}