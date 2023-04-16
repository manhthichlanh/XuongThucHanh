const mongoose = require("./database");

const cartSchema = new mongoose.Schema({
    cartId:   { type:Number, required:true },
    userId: { 
      type:mongoose.Types.ObjectId,
      ref: 'users',
     },
    book: [
      {
        bookId:{ type:Number, required:true },
        title: { type:String, required:true },
        price: { type:String, required:true },
        quantity: { type: Number, required:true},
        thumbnail: { type:String, required:true },
        authors: { type:String, required:true },
        description: {type: String}, 
        publishedDay: { type:String, required:true },
        _id: false
      }
    ],
    flag: { type: Number , required:true}
  },{
    collation: { locale: 'en', strength: 2 },
  });

module.exports = mongoose.model('carts', cartSchema);



