const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userService = require("../services/users.service");
const passportJWT = require("passport-jwt");
const secret = require("./configCommon").JWT.secret;

const util = require("../utils/utils");
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await userService.get({
          where: {
            username: username,
          },
        });

        if (user.length === 0) {
          return done(null, false, { message: "Incorrect username." });
        }

        const comparedPassword = await util.verifyPassword(
          password,
          user[0].dataValues
        );

        delete user[0].dataValues.password;

        if (!comparedPassword) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user[0].dataValues, {
          message: "Logged In Successfully",
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    },
    async (jwtPayload, done) => {
      try {
        const user = await userService.get({ where: { id: jwtPayload.id } });
        delete user[0].dataValues.password;
        done(null, user[0].dataValues);
      } catch (error) {
        return done(error);
      }
    }
  )
);
