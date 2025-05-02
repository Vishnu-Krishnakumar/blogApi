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
  return create;
}

async function userFound(user) {
  const found = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });
  const match = await bcrypt.compare(user.password, found.password);
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

async function getPost(postId) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  return post;
}
async function updatePost(post) {
  console.log(post);
  const updatedPost = await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      title: post.title,
      content: post.content,
    },
  });
  console.log(updatedPost);
  return updatedPost;
}

async function deletePost(postId) {
  const deletedPost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return deletedPost;
}
async function getComment(commentId) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  return comment;
}
async function postComments(postId) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
  });
  return comments;
}

async function createComment(comment) {
  const createdComment = await prisma.comment.create({
    data: {
      username: comment.username,
      content: comment.content,
      postId: comment.postId,
      authorId: comment.authorId,
    },
  });
  return createdComment;
}

async function updateComment(comment) {
  const updatedComment = await prisma.comment.update({
    where: {
      id: comment.commentId,
      postId: comment.postId,
    },
    data: {
      content: comment.content,
    },
  });
  return updatedComment;
}

async function deleteComment(commentId) {
  const deletedComment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  return deletedComment;
}
module.exports = {
  createUser,
  userFound,
  userVerify,
  userPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  postComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
