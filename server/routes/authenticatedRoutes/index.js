const jwt = require('express-jwt')
const express = require('express')
const router = express.Router({mergeParams: true})

const asyncWrap = require('./../../helpers/asyncWrap')
const jwtService = require('./../../services/jwtService')
const { User } = require('./../../models')


// localhost:3010/users?eager=user_platforms.[platform,passwords]
router.get('/users/:id', asyncWrap( async (req, res, next) => {
  let user = await User
    .query()
    .allowEager('user_platforms.[platform,passwords]')
    .eager(req.query.eager)
    .findById(req.params.id)
  // TODO: Remove hashed passwords from response
  res.send(user)
}));

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