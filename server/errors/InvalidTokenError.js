const { ApiError } = require('./')

class InvalidTokenError extends ApiError {
  constructor(message) {
    super(message || 'Invalid token', 401)
  }
}

module.exports = InvalidTokenError