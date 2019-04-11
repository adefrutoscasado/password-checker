const jwt = require('express-jwt')
const express = require('express')
const router = express.Router({ mergeParams: true })
const asyncWrap = require('./../../helpers/asyncWrap')
const jwtService = require('./../../services/jwtService')
const { User, Platform, Password } = require('./../../models')

router.use(async (req, res, next) => {
  let token = jwtService.getBearerToken(req)
  if (token) {
    return jwt({
      secret: req.app.get('JWT_SECRET'),
      requestProperty: 'auth'
    })(req, res, next)
  }
  res.status(401).send(new Error('Invalid token'))
})

// localhost:3010/users?eager=user_platforms.[platform,passwords]
router.get('/users/:userId', asyncWrap(async (req, res, next) => {
  let user = await User
    .query()
    .allowEager('user_platforms.[platform,passwords]')
    .eager(req.query.eager)
    .findById(req.params.userId)
  // TODO: Remove hashed passwords from response
  res.send(user)
}));

// localhost:3010/platforms
router.get('/platforms', asyncWrap(async (req, res, next) => {
  let platforms = await Platform.query()
  res.send(platforms)
}));

router.post('/users/:userId/platforms/:platformId/password', asyncWrap(async (req, res, next) => {
  let { password, score } = req.body
  let platformId = parseInt(req.params.platformId)
  let userId = parseInt(req.params.userId)

  let user = await User
    .query()
    .eager('user_platforms')
    .findById(userId)

  let userPlatform = user.getPlatform(platformId)
  if (!userPlatform)
    userPlatform = await user
      .$relatedQuery('user_platforms')
      .insertAndFetch({ platform_id: platformId })

  let passwordCreated = await Password
    .query()
    .insertAndFetch({ user_platform_id: userPlatform.id, password, score })

  res.send(passwordCreated)
}));

router.get('/ranking', asyncWrap(async (req, res, next) => {
  let users = await User
    .query()
    .eager('user_platforms.[platform,passwords]')

  users.sort((userA, userB) => userB.total_score - userA.total_score);
  res.send(users)
}));

router.get('/validateToken', asyncWrap(async (req, res, next) => {
  res.send({ message: 'ok' })
}));

module.exports = router;