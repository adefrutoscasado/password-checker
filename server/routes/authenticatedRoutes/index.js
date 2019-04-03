const jwt = require('express-jwt')
const express = require('express')
const asyncWrap = require('./../../helpers/asyncWrap')
const router = express.Router({mergeParams: true})
const jwtService = require('./../../services/jwtService')

router.use(async (req, res, next) => {
  let token = jwtService.getBearerToken(req)
  if (token) {
    return jwt({
      secret: req.app.get('JWT_SECRET'),
      requestProperty: 'auth'
    })(req, res, next)
  }
  next (new Error('Invalid token'))
})

router.get('/validateToken', asyncWrap( async (req, res, next) => {
  res.send({message: 'ok'})
}));

module.exports = router;