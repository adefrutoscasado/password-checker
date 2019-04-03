const express = require('express')
const router = express.Router({mergeParams: true})

const jwtService = require('./../../services/jwtService')
const asyncWrap = require('./../../helpers/asyncWrap')
const { User } = require('./../../models')

router.post('/register', asyncWrap( async (req, res, next) => {
  let data = req.body
  let user = await User.query().insertAndFetch(data)
  res.status(201).json(
    {
      message: 'User created',
      user: {
        id: user.id,
        email: user.email
      }
    }
  );
}));

router.post('/login', asyncWrap( async (req, res, next) => {
  let { email, password } = req.body
  let user = await User.getByEmail(email)
  let success = user.checkCredentials(password)
  if (!success) throw Error('Invalid credentials')

  let payload = {id: user.id}
  let accessToken = await jwtService.generateAccessToken(req, payload)
  res.json(
    {
      ...payload,
      access_token: accessToken
    }
  );
}));


module.exports = router;
