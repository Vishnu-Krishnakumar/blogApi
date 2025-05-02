const { Router } = require("express");
const userRoutes = Router();
const userController = require("../controller/userController");
const auth = require("../auth/auth");
const validation = require("../validation/validation")
userRoutes.post("/register",validation.validateUser, userController.register);
userRoutes.post("/login", userController.login);
userRoutes.post(
  "/id",
  auth.passport.authenticate("jwt", { session: false }),
  userController.test
);
module.exports = userRoutes;
