const express = require('express')
const router = express.Router({mergeParams: true})
const jwt = require('jsonwebtoken')

const jwtService = require('./../../services/jwtService')
const asyncWrap = require('./../../helpers/asyncWrap')
const { User } = require('./../../models')

router.post('/register', asyncWrap( async (req, res, next) => {
  let data = req.body
  if (data.password !== data.confirmPassword) throw new Error('Confirm password does not match')
  let userExists = await User.getByUsername(data.username)
  if (userExists) throw new Error('User already exists')
  let user = await User.query().insertAndFetch({username: data.username, password: data.password})
  res.status(201).json(
    {
      message: 'User created',
      user: user.toResponse()
    }
  );
}));

router.post('/login', asyncWrap( async (req, res, next) => {
  let { username, password } = req.body
  let user = await User.getByUsername(username)
  if (!user) throw new Error ('User does not exist!!')
  let success = user.checkCredentials(password)
  if (!success) throw Error('Invalid credentials')

  let payload = {id: user.id}
  let accessToken = await jwtService.generateAccessToken(req, payload)
  let refreshToken = await jwtService.generateRefreshToken(req, payload)
  res.json(
    {
      ...payload,
      access_token: accessToken,
      refresh_token: refreshToken
    }
  );
}));

router.post('/refresh', asyncWrap(async (req, res) => {
  if(!((req.body).hasOwnProperty('refresh_token'))){
    throw new Error('Invalid token')
  }
  const refreshToken = req.body.refresh_token
  let tokenData
  jwt.verify(refreshToken, req.app.get('REFRESH_JWT_SECRET'), (err, decoded) => {
    if(err) {
      throw new Error(err.message)
    } else {
      tokenData = decoded
    }
  })

  const payload = {
    id: tokenData.id
  }
  let accessToken = await jwtService.generateAccessToken(req, payload)
  let newRefreshToken = await jwtService.generateRefreshToken(req, payload)
  res.json(
    {
      ...payload,
      access_token: accessToken,
      refresh_token: newRefreshToken
    }
  );

}));

module.exports = router;