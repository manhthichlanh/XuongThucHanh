const express = require("express");
const cors = require("cors");
const allroutes = require("./routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// connect databast mongdDB
const port = 3000;
// Router
allroutes(app);
app.listen(port, () => {
  console.log("--server listening");
});
