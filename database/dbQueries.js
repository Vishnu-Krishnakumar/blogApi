const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function createUser(user) {
  const create = await prisma.user.create({
    data: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      author: user.author,
    },
  });
}

async function userFound(user) {
  console.log(user);
  const found = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });
  const match = bcrypt.compare(user.password, found.password);
  return match;
}

async function userVerify(user) {
  const found = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });
  return found;
}
module.exports = {
  createUser,
  userFound,
  userVerify,
};
