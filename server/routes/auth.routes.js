const router = require('express').Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { JWT } = require('../config/configCommon')
const { checkAuthJWT } = require('../utils/utils')

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err)
    if (user) {
      const token = jwt.sign(user, JWT.secret, JWT.options)
      return res.json({ token })
    } else {
      return res.status(422).json(info)
    }
  })(req, res, next)
})

router.get('/loggedIn', checkAuthJWT(), (req, res) => {
  // console.log(req.user);
  res.send('success')
})

router.post('/logout', (req, res) => {
  req.logout()
  res.send('logout success')
})

module.exports = router
