const { Router } = require("express");
const userRoutes = Router();
const userController = require("../controller/userController");

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    //forbidden
    res.sendStatus(403);
  }
}

userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);
userRoutes.post("/id", verifyToken, userController.test);
module.exports = userRoutes;
