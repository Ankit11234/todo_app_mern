const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/Auth.js');

const {getAllUsers,signup, login} = require("../controller/user-controller.js");


router.get("/",verifyToken,getAllUsers);
router.post("/signup",signup);
router.post("/login",login);

module.exports = router;