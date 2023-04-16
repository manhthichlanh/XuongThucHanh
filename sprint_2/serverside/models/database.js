const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/FPTBookStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = mongoose;
