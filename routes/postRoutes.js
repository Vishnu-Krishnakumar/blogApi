const { Router } = require("express");
const postRoutes = Router();
const postController = require("../controller/postController");
const auth = require("../auth/auth");

postRoutes.get(
  "/",
  auth.passport.authenticate("jwt", { session: false }),
  postController.posts
);
postRoutes.post(
  "/",
  auth.passport.authenticate("jwt", { session: false }),
  postController.createPost
);
module.exports = postRoutes;
