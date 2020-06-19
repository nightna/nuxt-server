const passport = require('passport')

module.exports = (app) => {
  app.get('/api/', (req, res) => {
    res.json({ msg: 'Hello from API' })
  })

  app.use('/api/auth', require('./auth.routes'))
  app.use(
    '/role',
    passport.authenticate('jwt', { session: false }),
    require('./roles.routes')
  )
  app.use(
    '/api/user',
    passport.authenticate('jwt', { session: false }),
    require('./users.routes')
  )
  app.use(
    '/api/screen',
    passport.authenticate('jwt', { session: false }),
    require('./screen.routes')
  )
  app.use(
    '/api/userscreen',
    passport.authenticate('jwt', { session: false }),
    require('./userScreen.routes')
  )
  app.use(
    '/api/modbus',
    passport.authenticate('jwt', { session: false }),
    require('./modbus.routes')
  )
}
