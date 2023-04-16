const express = require("express");
const routes = express.Router();
const UserController = require("../controller/UserController");
// useouter  /users/add

routes
  .get("", UserController.getAll)
  .post("/add", UserController.addUser)
  .delete("/:_id", UserController.deleteUser);

module.exports = routes;
