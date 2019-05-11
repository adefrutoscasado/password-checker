const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router({ mergeParams: true })
const asyncWrap = require('./../../helpers/asyncWrap')
const jwtService = require('./../../services/jwtService')
const { User, Platform, Password } = require('./../../models')
const { InvalidTokenError } = require('./../../errors')

router.use(asyncWrap (async (req, res, next) => {
  let token = jwtService.getBearerToken(req)
  jwt.verify(token, req.app.get('JWT_SECRET'), function(err, decoded) {
    if (err) throw new InvalidTokenError(err.message)
    req.auth = decoded
  });
  next()
}))

// localhost:3010/users?eager=user_platforms.[platform,passwords]
router.get('/users/:userId(\\d+)', asyncWrap(async (req, res, next) => {
  let user = await User
    .query()
    .allowEager('user_platforms.[platform,passwords]')
    .eager(req.query.eager)
    .findById(req.params.userId)
  res.send(user.toResponse())
}));

// localhost:3010/platforms
router.get('/platforms', asyncWrap(async (req, res, next) => {
  let platforms = await Platform.query()
  res.send(platforms)
}));

router.post('/users/:userId(\\d+)/platforms/:platformId(\\d+)/password', asyncWrap(async (req, res, next) => {
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

  res.send(passwordCreated.toResponse())
}));

// TODO: Review why patch receives a empty req.body
router.put('/users/:userId(\\d+)/upsert', asyncWrap(async (req, res, next) => {
  let { body } = req
  let userId = parseInt(req.params.userId)
  let data = {
    id: userId,
    ...body
  }
  let userUpdated = await User.upsertGraphAndFetch(data)

  res.send(userUpdated.toResponse())
}));

router.get('/ranking', asyncWrap(async (req, res, next) => {
  let users = await User
    .query()
    .eager('user_platforms.[platform,passwords]')

  users.sort((userA, userB) => userB.total_score - userA.total_score);
  res.send(users.map(u => u.toRankingResponse()))
}));

router.get('/validateToken', asyncWrap(async (req, res, next) => {
  res.send({ message: 'ok' })
}));

module.exports = router;