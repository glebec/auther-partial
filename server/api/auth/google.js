var router = require('express').Router();
var passport = require('passport');
var User = require('../users/user.model');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var theGoogleStrategy = new GoogleStrategy({
  clientID: '684619883667-k30621ulprrmei5fsot3j4i5kgunj3b3.apps.googleusercontent.com',
  clientSecret: '3uDb9Ua__hThXVQd7arkiRBe',
  callbackURL: '/api/auth/google/callback'
}, function (token, refreshToken, profile, done) {
  const info = {
    name: profile.displayName,
    email: profile.emails[0].value,
    photo: profile.photos ? profile.photos[0].value : undefined
  };
  User.findOrCreate({
    where: {googleId: profile.id},
    defaults: info
  })
  .spread(function (user) {
    done(null, user);
  })
  .catch(done);
});

passport.use(theGoogleStrategy);

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));

module.exports = router;
