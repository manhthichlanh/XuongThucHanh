const mongoose = require("./connectDB");


const resultSchema = new mongoose.Schema({
  user: { 
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users"
    },
    fullname: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    } 
  },
  gift: [
    { 
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId // tự động tạo một ObjectId mới cho mỗi object
      },
      name: {
        type: String,
        required: true
      },
    }
  ],
  
},
{ timestamps: true });

module.exports = mongoose.model("results", resultSchema );

