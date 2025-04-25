const { Router } = require("express");
const commentRoutes = Router();
const commentController = require("../controller/commentController");
const auth = require("../auth/auth");
commentRoutes.get(
  "/:postId",
  auth.passport.authenticate("jwt", { session: false }),
  commentController.allComments
);

commentRoutes.post(
  "/:postId",
  auth.passport.authenticate("jwt", { session: false }),
  commentController.createComment
);

commentRoutes.put(
  "/:postId/:commentId",
  auth.passport.authenticate("jwt", { session: false }),
  commentController.updateComment
);

commentRoutes.delete(
  "/:postId/:commentId",
  auth.passport.authenticate("jwt", { session: false }),
  commentController.deleteComment
);

module.exports = commentRoutes;
