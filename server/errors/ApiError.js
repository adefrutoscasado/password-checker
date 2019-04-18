
class ApiError extends Error {
  constructor(message, status) {
    super()
    this.status = status || 500
    this.message = message || 'Internal Error'
    // Capturing stack trace, excluding constructor call from it.
    // Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ApiError