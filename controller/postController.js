require("dotenv").config();
const queries = require("../database/dbQueries");

async function allPosts(req, res) {
  const posts = await queries.userPosts(req.user.user);
  res.json(posts);
}

async function createPost(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published || false,
    authorId: req.user.user.id,
  };
  const created = await queries.createPost(post);
  res.json(created);
}

async function getPost(req, res) {
  const postId = parseInt(req.params.postId);
  const post = await queries.getPost(postId);
  res.json(post);
}

async function updatePost(req, res) {
  const postId = parseInt(req.params.postId);
  const post = {
    id: postId,
    title: req.body.title,
    content: req.body.content,
  };
  const updatedPost = await queries.updatePost(post);
  res.json(updatedPost);
}

async function deletePost(req, res) {
  const postId = parseInt(req.params.postId);
  const deletedPost = await queries.deletePost(postId);
  res.json("Post Deleted!", deletedPost);
}
module.exports = {
  allPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};
