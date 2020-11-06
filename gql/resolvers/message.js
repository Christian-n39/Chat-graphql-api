const Message = require('../../models/message');

module.exports = {
  Query: {
    getMessage: () => 'Hola',
    getMessages: async () => {
      try {
        const messages = await Message.find();
        return messages;
      } catch (err) { console.error(err) }
    }
  }
}