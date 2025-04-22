// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import { v4 as uuidv4 } from "uuid";
// import jwt from "jsonwebtoken";
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = process.env.PORT;

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(verifyToken);
app.use("/", commentRoutes);
app.use("/", postRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
