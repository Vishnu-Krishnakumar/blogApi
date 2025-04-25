const { Router } = require("express");
const postRoutes = Router();
const postController = require("../controller/postController");
const auth = require("../auth/auth");

postRoutes.get(
  "/",
  auth.passport.authenticate("jwt", { session: false }),
  postController.allPosts
);

postRoutes.get(
  "/:postId",
  auth.passport.authenticate("jwt", { session: false }),
  postController.getPost
);

postRoutes.post(
  "/",
  auth.passport.authenticate("jwt", { session: false }),
  postController.createPost
);

postRoutes.put(
  "/:postId",
  auth.passport.authenticate("jwt", { session: false }),
  postController.updatePost
);

postRoutes.delete(
  "/:postId",
  auth.passport.authenticate("jwt", { session: false }),
  postController.deletePost
);
module.exports = postRoutes;
