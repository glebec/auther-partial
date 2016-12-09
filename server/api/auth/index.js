const router = require('express').Router();
var User = require('../users/user.model');

router.post('/login', function (req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.json(user);
    }
  })
  .catch(next);
});

router.post('/signup', function (req, res, next) {
  User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      password: req.body.password
    }
  })
  .spread(function (user, created) {
    if (!created) {
      res.sendStatus(401); // user already existed, cannot sign up again
    } else {
      req.session.userId = user.id;
      res.json(user);
    }
  })
  .catch(next);
});

module.exports = router;
