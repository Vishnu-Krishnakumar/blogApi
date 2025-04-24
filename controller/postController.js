require("dotenv").config();
const queries = require("../database/dbQueries");

async function posts(req, res) {
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

module.exports = { posts, createPost };
