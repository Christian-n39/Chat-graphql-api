const Message = require('../../models/message');
const Chat = require('../../models/chat');
const User = require('../../models/users');
const checkAuth = require('../../utils/checkAuth');
const { UserInputError } = require('apollo-server');

module.exports = {
  Query: {
    getMessage: () => 'Hola',
    getMessages: async (_, { chatId }, context) => {
      const user = checkAuth(context);
      const chat = await Chat.findById(chatId)

      const from = await User.findById(user.id);
      const to = await User.findById(chat.users[0] == user.id ? chat.users[1] : chat.users[0]);

      const messages = await Message.find({ username: user.username }).sort({ createdAt: -1 });
      return messages.map((message) => {
          return {
          id: message._id,
          body: message.body,
          createdAt: message.createdAt,
          conversation: { id: chat._id, users: [ from, to ] },
          username: user.username}
        })
    }
  },
  Mutation: {
    createMessage: async (_, { body, chatId }, context) => {
      const user = checkAuth(context);
      if(body.trim() === '') { throw new UserInputError('Message must not be empty') };

      const chat = await Chat.findById(chatId)
      if(!chat){ throw new UserInputError('Chat doesn`t exist') }

      const newMessage = new Message({
        body: body,
        createdAt: new Date().toISOString(),
        chat: chat._id,
        username: user.username
      })
      const sentMessage = await newMessage.save();
      sentMessage.toJSON()
      const from = await User.findById(user.id);
      const to = await User.findById(chat.users[0] == user.id ? chat.users[1] : chat.users[0]);

      return {
        id: sentMessage._id,
        body: sentMessage.body,
        createdAt: sentMessage.createdAt,
        conversation: { id: chat._id, users: [ from, to ] },
        username: user.username,
      };
    },
    deleteMessage: async (_, { messageId }, context) => {
      const user = checkAuth(context);
      const messageToDelete = await Message.findById(messageId);

      if(messageToDelete.username !== user.username){ throw new UserInputError('Not authorized') }

      await Message.deleteOne({_id: messageId});

      return 'Message deleted'
    }
  }
}