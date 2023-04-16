const mongoose = require("./connectDB");

const Users = new mongoose.Schema(
  {
    fullname: { type: String, require },
    phone: { type: Number },

  },
  { timestamps: true }
);
module.exports = mongoose.model( "users", Users);
