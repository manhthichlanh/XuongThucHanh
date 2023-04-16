const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/spinner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = mongoose;

