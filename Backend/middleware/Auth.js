const jwt = require("jsonwebtoken");

const config = "JWT_TOKEN";

// const verifyToken = (req, res, next) => {
//   const token = req.headers["x-access-token"];

//   console.log("token in auth js ia ",token)
//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, config);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized request");
    }
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    try {
      const decoded = jwt.verify(token, config);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(400).send("Invalid token.");
    }
  };
  

module.exports = verifyToken;