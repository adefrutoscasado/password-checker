
const jwt = require('jsonwebtoken')

let generateAccessToken = (req, payload) => {
  return jwt.sign({ 
    ...payload,
    expiresIn: '1h',
  }, req.app.get('JWT_SECRET'));
}

module.exports = {generateAccessToken}