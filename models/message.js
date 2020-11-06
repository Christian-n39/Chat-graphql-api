const { Schema, model } = require('mongoose');

const messagesSchema = new Schema({
  body: String,
  createdAt: String,
  username: String,
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'chats'
  }
});

module.exports = model('message', messagesSchema)