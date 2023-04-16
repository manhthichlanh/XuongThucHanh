const userRoute = require("./userRoute");
const resultRoute = require("./resultRoute");
function routes(app) {
  app.use("/users", userRoute);
  app.use("/results",resultRoute);
}

module.exports = routes;
