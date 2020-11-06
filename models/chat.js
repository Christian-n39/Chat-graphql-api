const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  users: [{
    type: Schema.ObjectId,
    ref: 'users'
  }]
});

module.exports = model('chat', chatSchema)