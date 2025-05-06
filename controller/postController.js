require("dotenv").config();
const queries = require("../database/dbQueries");

async function userPosts(req, res) {
  const posts = await queries.userPosts(req.user.user);
  res.json(posts);
}
async function allPosts(req,res){
  const allPosts = await queries.allUserPosts();
  res.json(allPosts);
}
async function createPost(req, res) {
  let published = false;
  if (req.body.published === "true") {
    published = true;
  }
  const post = {
    title: req.body.title,
    content: req.body.content,
    published: published,
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
  const check = await queries.getPost(postId);
  console.log(req.body);
  if (check.authorId !== req.user.user.id)
    return res.json("Not authorized to edit this post!");
  else {
    const post = {
      id: postId,
      title: req.body.title,
      content: req.body.content,
      published: req.body.published === "true" ? true:false,
    };
    console.log(post);
    const updatedPost = await queries.updatePost(post);
    res.json(updatedPost);
  }
}

async function deletePost(req, res) {
  const postId = parseInt(req.params.postId);
  const post = await queries.getPost(postId);
  const postAuthorCheck = await queries.userVerify(req.user.user);
  if (post.authorId !== postAuthorCheck.id)
    return res.json("Not authorized to delete this post!");
  else {
    const postId = parseInt(req.params.postId);
    const deletedPost = await queries.deletePost(postId);
    res.json("Post Deleted!", deletedPost);
  }
}

module.exports = {
  userPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  allPosts,
};
