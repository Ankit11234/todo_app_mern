const express = require('express');
const app=express();
const mongoose = require("mongoose");
const router= require("./routes/user-route");
const routers= require("./routes/task-route");
const cors = require("cors");
const path=require('path');

app.use(cors());
const uri = "mongodb+srv://admin:admin@cluster0.rj7p3oa.mongodb.net/task"

app.use(express.json());
mongoose.set('strictQuery', false);

mongoose.connect(uri);
const conn = mongoose.connection;
conn.once('open',()=>{
  console.log("mongo db is connected");
})
conn.on('error',()=>{
  console.log("error in dv");
  process.exit();
})

app.get('/',(req,res)=>{
  res.send("hello world")
})

const PORT=8000;
app.listen(PORT,()=>{
  console.log("Server is running on",PORT)
})
app.use("/api/user",router);
app.use("/api/task",routers);
