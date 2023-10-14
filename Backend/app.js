const express = require('express');
const app=express();
const mongoose = require("mongoose");
const router= require("./routes/user-route");
const routers= require("./routes/task-route");
const cors = require("cors");
const path=require('path');

// const uri="mongodb://0.0.0.0/task";
// admin admin
// ['http://localhost:3000','https://creative-narwhal-1683d8.netlify.app'],
// const corsOrigin ={
//   origin: '*', // Replace with the actual origin that needs access
//   methods: 'GET,POST', // Specify the HTTP methods you want to allow
//   allowedHeaders: 'Content-Type,Authorization',
// }
app.use(cors());
const uri = "mongodb+srv://admin:admin@cluster0.rj7p3oa.mongodb.net/task"
app.use(express.json());
mongoose.set('strictQuery', false);
// app.use(cors());

mongoose.connect(uri);
const conn = mongoose.connection;
conn.once('open',()=>{
  console.log("mongo db is connected");
})
conn.on('error',()=>{
  console.log("error in dv");
  process.exit();
})

// if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
// } 

app.get('/',(req,res)=>{
  res.send("hello world")
})

const PORT=8000;
app.listen(PORT,()=>{
  console.log("Server is running on",PORT)
})
app.use("/api/user",router);
app.use("/api/task",routers);