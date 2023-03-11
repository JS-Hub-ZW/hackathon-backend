var express = require('express');
const User = require('../schemas/users');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await User.find({})
  res.send(users);
});

module.exports = router;
