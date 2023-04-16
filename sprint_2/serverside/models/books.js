const mongoose = require("./database");

const bookSchema = new mongoose.Schema({
    bookId:   { type:Number, required:true },
    title: { type:String, required:true },
    price: { type:String, required:true },
    currency: { type:String, required:true },
    thumnail: { type:String, required:true },
    authors: { type:String, required:true },
    publisher: { type:String, required:true },
    publishedDay: { type:String, required:true },
    description: { type:String, required:true },
    noted: { type:String, required:true },
  },{
    collation: { locale: 'en', strength: 2 },
  });

module.exports = mongoose.model('books', bookSchema);



