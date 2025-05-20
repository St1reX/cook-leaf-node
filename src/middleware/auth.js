const passport = require("../utils/passportConfig");

async function authenticateJWT(req, res, next) {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Authentication error!" });
    }

    req.user = user;
    next();
  })(req, res, next);
}

module.exports = authenticateJWT;
