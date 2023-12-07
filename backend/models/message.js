const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  message: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
