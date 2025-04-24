require("dotenv").config();
const bcrypt = require("bcryptjs");
const queries = require("../database/dbQueries");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  console.log(req.body);
  const user = await createUser(req.body);
  console.log(user);
  try {
    const created = await queries.createUser(user);
    res.send(created);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function login(req, res) {
  const found = await queries.userFound(req.body);
  const user = {
    id: found.id,
    firstname: found.firstname,
    lastname: found.lastname,
    email: found.email,
  };
  console.log(user);
  if (found) {
    try {
      jwt.sign({ user: user }, process.env.secret, (err, token) => {
        res.cookie("auth_jwt", token, {
          httpOnly: true,
          secure: "isProd",
          sameSite: "Strict",
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
