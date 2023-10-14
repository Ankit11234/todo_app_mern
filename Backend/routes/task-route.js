const express = require("express");
const router = express.Router();
const auth = require('../middleware/Auth');
const {getAlltasks,addtasks,updatetask,deletetask,getById,getByuserId} = require("../controller/task-controller.js");


router.get("/",getAlltasks);
router.post("/add",addtasks);
router.put("/update/:id",updatetask);
router.delete("/:id",deletetask);
router.get("/:id",getById);
router.get("/user/:id",getByuserId);


module.exports = router;