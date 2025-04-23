const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(verifyToken);
// app.use("/", commentRoutes);
// app.use("/", postRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log(`Listening to port ${PORT}`);
});
