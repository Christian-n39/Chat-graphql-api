const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const User = require('../../models/users');

const { AUTH_JWT_SECRET } = process.env;


module.exports = {
  Mutation: {
    register: async (_, { input: {username, password, confirmPassword, email} }) => {
      if(password !== confirmPassword) {
        throw new UserInputError('Password and confirm password must match')
      }

      const userAlreadyExist = await User.findOne({ username });
      if(userAlreadyExist) { throw new UserInputError('this username is already taken') };

      password = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString()
      })
      const savedUser = await newUser.save();


      const token = await jwt.sign({ 
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username }, AUTH_JWT_SECRET, { expiresIn: "1h" });

      return {
        ...savedUser._doc,
        id: savedUser._id,
        token
      }
    },

    login: async (_, { input: { username, password } }) => {
      const user = await User.findOne({ username });
      if(!user) { throw new UserInputError('User doesn´t exist') }

      const correctPassword = await bcrypt.compare(password, user.password);
      if(!correctPassword) { throw new UserInputError('Wrong credentials') };

      const token = jwt.sign({
        id: user.id, email: user.email, username: user.username,
      }, AUTH_JWT_SECRET, { expiresIn: "1h" });

      return {
        ...user._doc,
        id: user._id,
        token
      }
    }
  },
}