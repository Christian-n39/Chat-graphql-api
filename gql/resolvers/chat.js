const Chat = require('../../models/chat');
const User = require('../../models/users');
const checkAuth = require('../../utils/checkAuth');
const { UserInputError } = require('apollo-server');

module.exports = {
  Query: {
    getChats: async (_, __, context) => {
      const user = checkAuth(context);
      return new Promise((resolve, reject) => {
        Chat.find({ users: user.id })
            .populate('users')
            .exec((err, populatedData) => {
                if(err) {
                    reject(err)
                    return false
                }
                resolve(populatedData)
            })
      }).then(data => data)
    }
  },
  Mutation: {
    createChat: async (_, { messageTo }, context) => {
      const user = checkAuth(context);
      const from = await User.findById(user.id);
      const to = await User.findById(messageTo);
      if(!to) { throw new UserInputError('User doesn`t exist') }
      const newChat = new Chat({ users: [ from, to ] })
      const savedChat = await newChat.save();
      return savedChat;
    }
  }
}