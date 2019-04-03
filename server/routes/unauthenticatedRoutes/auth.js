var express = require('express');
const router = express.Router({mergeParams: true})

const { User } = require('./../../models')

router.post('/register', async function(req, res, next) {
  let data = req.body
  await User.query().insert(data)
  res.json(
    {user: 'OK'}
  );
});

router.post('/login', function(req, res, next) {
  res.json(
    {user: 'OK'}
  );
});


module.exports = router;
