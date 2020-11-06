const { Schema, model } = require('mongoose');

const messagesSchema = new Schema({
  body: String,
  createdAt: String,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('message', messagesSchema)