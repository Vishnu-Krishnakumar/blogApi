const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const auth = require("./auth/auth");
const bodyParser = require("body-parser");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173","https://blogapipost.onrender.com/"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(auth.passport.initialize());
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log(`Listening to port ${PORT}`);
});
