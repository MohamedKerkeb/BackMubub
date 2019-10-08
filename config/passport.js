const localStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const dbConnect = require("./connect");

module.exports = passport => {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      const email = req.body;
      dbConnect.query(
        "SELECT * FROM users WHERE email = ?",
        email,
        (err, user) => {
          if (err) {
            throw err;
          }
          if (!user) {
            return done(null, false, {
              message: "That email is not registred"
            });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password Incorrect" });
            }
          });
        }
      );
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    dbConnect.query("SELECT * FROM users WHERE id = ?", id, (err, user) => {
      done(err, user);
    });
  });
};
