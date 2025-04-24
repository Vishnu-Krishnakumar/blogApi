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
  const found = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });
  const match = bcrypt.compare(user.password, found.password);
  if (match) return found;
  else return null;
}

async function userVerify(user) {
  const found = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });
  return found;
}

async function userPosts(user) {
  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
  });
  return posts;
}
async function createPost(post) {
  const created = await prisma.post.create({
    data: {
      title: post.title,
      content: post.content,
      published: post.published,
      authorId: post.authorId,
    },
  });
  return created;
}
module.exports = {
  createUser,
  userFound,
  userVerify,
  userPosts,
  createPost,
};
