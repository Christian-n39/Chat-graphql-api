const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { AUTH_JWT_SECRET } = process.env;


module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if(authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if(token) {
      try{
        const user = jwt.verify(token, AUTH_JWT_SECRET);
        return user
      } catch(err) {
        throw new AuthenticationError('Invalid or Expired Token')
      }
    }
    throw new Error('Auth token must be \'Bearer [token]')
  }
  throw new Error('Auth header must be provided')
}
