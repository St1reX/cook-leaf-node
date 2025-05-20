const User = require("../models/User");

const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");

const cookieExtractor = (req) => {
  return req?.cookies?.token || null;
};

var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_PRIVATE_KEY;
opts.issuer = "http://localhost:8080";
opts.audience = "http://localhost:5173";

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.sub);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
