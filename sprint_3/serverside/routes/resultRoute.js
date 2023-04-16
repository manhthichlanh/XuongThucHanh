const express = require("express");
const routes = express.Router();
const ResultController = require("../controller/ResultController");
// useouter  /users/add
routes
  .get("", ResultController.getAll)
  .post("", ResultController.postGift)
  .delete("/:_id", ResultController.deleteResult);

module.exports = routes;
