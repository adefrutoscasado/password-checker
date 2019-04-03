var express = require('express');
const router = express.Router({mergeParams: true})

router.post('/login', function(req, res, next) {
  res.json(
    {user: 'OK'}
  );
});

module.exports = router;
