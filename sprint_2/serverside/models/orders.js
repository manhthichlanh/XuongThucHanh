const mongoose = require("./database");

const orderSchema = new mongoose.Schema({
    orderId:   { type:Number, required:true },
    cartId:   { type:Number, required:true },
    username: { type:String, required:true },
    bookId: { type:Number, required:true },
    price: { type:Number, required:true },
    quanlity: { type:Number, required:true },
    total: { type:Number, required:true },
    orderDate: { type:String, required:true },
    status: { type:String, required:true },
    noted: { type:String, required:true }
  },{
    collation: { locale: 'en', strength: 2 },
  });

module.exports = mongoose.model('orders', orderSchema);



