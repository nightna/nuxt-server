const express = require('express')
const app = express()
const passport = require('passport')
const morgan = require('morgan')

require('./config/passport')

app.use(morgan('dev'))

app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

require('./routes')(app)

module.exports = {
  app
}
