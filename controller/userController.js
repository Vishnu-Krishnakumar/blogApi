require("dotenv").config();
const bcrypt = require("bcryptjs");
const queries = require("../database/dbQueries");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const user = await createUser(req.body);
  const created = '';
  try {
    created = await queries.createUser(user);
    res.json({
      message:"Created user!"
    })
  } catch (error) {
    if(error.code === "P2002"){
      res.json({
        message:"Someone with this email is already registered!"
      })
    }
  }
}

async function login(req, res) {
  const found = await queries.userFound(req.body);
  if (found === null) return res.sendStatus(403);
  const user = {
    id: found.id,
    firstname: found.firstname,
    lastname: found.lastname,
    email: found.email,
  };
  console.log(user);
  if (found !== null) {
    try {
      jwt.sign({ user: user }, process.env.secret, (err, token) => {
        res.cookie("auth_jwt", token, {
          httpOnly: true,
          secure: "true",
          sameSite: "None",
          maxAge: 60 * 60 * 1000,
        });
        res.json({
          token,
        });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else res.sendStatus(403);
}

async function createUser(body) {
  let author = false;

  const hashedPassword = await bcrypt.hash(body.password, 10);

  if (body.author === "true") author = true;
  const user = {
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    password: hashedPassword,
    author: author,
  };
  return user;
}

async function test(req, res) {
  return res.json("verfied, good job!");
}

module.exports = {
  register,
  login,
  test,
};
