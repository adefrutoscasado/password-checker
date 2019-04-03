
const jwt = require('jsonwebtoken')

let generateAccessToken = (req, payload) => {
  return jwt.sign({ 
    ...payload,
    expiresIn: '1h',
  }, req.app.get('JWT_SECRET'));
}

function getBearerToken(req) {
  const queryKey = 'access_token'
  const bodyKey = 'access_token'
  const headerKey = 'Bearer'
  let token, error

  if (req.query && req.query[queryKey]) {
    token = req.query[queryKey]
  }

  if (req.body && req.body[bodyKey]) {
    if (token) {
      error = true
    }
    token = req.body[bodyKey]
  }

  if (req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(' ')
    if (parts.length === 2 && parts[0] === headerKey) {
      if (token) {
        error = true
      }
      token = parts[1]
    }
  }

  // RFC6750 states the access_token MUST NOT be provided
  // in more than one place in a single request.
  if (error) {
    return false
  } else {
    return token
  }
}

module.exports = {generateAccessToken, getBearerToken}