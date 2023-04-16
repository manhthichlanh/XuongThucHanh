const mongoose = require("./database");

const userSchema = new mongoose.Schema({
    userId:   { type:Number, required:true },
    username: { type:String, required:true },
    firstname: { type:String, required:true },
    lastname: { type:String, required:true },
    email: { type:String, required:true },
    address: { type:String, required:true },
    phone: { type:Number, required:true },
    password: { type:String, required:true },

  },{
    collation: { locale: 'en', strength: 2 },
  });

module.exports = mongoose.model('users', userSchema);



