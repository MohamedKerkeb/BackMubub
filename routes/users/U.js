const dbConnect = require("../../config/connect");
const bcrypt = require("bcrypt");
const passport = require("passport");

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

module.exports = {
  create: (req, res, next) => {
    console.log("create a users");

    let {
      firstname,
      lastname,
      email,
      password,
      password2,
      isAdmin,
      isActif,
      username,
      adress,
      phone,
      codePostal,
      town,
      wilayaId
    } = req.body;

    let errors = [];

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !password2 ||
      !username ||
      !adress ||
      !phone ||
      !codePostal ||
      !town ||
      !wilayaId
    ) {
      return res.status(400).json({ error: "Remplir tout les champs" });
      //errors.push({ msg: "Remplir tout les champs" });
    }

    if (password !== password2) {
      return res.status(400).json({
        error: "password invalid (password are not identical)"
      });
    }

    if (username.length >= 26 || username.length <= 3) {
      errors.push("username must be length 4 and 25");
    }

    if (!PASSWORD_REGEX.test(password)) {
      errors.push(
        "password invalid _ must lenght 4 - 8 and include 1 number at least "
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      errors.push("email is not valid ");
    }

    dbConnect.query(
      "SELECT * FROM Users WHERE email= ?",
      email,
      (err, user) => {
        if (err) {
          throw err;
        }
        //console.log("user", user.length);
        if (user.length === 0) {
          //console.log("lol");
          bcrypt.hash(password, 10, (err, hash) => {
            password = hash;
            console.log(password);
            dbConnect.query(
              "INSERT INTO Users (firstname, lastname, email, password, isAdmin, isActif, username, adress, phone, codePostal, town, wilayaId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                firstname,
                lastname,
                email,
                password,
                isAdmin,
                isActif,
                username,
                adress,
                phone,
                codePostal,
                town,
                wilayaId
              ],
              (err, result) => {
                if (err) {
                  res.status(500).json({
                    erreur: err,
                    message: "On arrrive as créer users"
                  });
                } else {
                  // console.log(password);
                  res
                    .status(200)
                    .redirect("/login")
                    .json(result);
                }
              }
            );
          });
        } else {
          return res.status(409).json({ error: "Vous exister déja" });
        }
      }
    );

    // dbConnect.query(
    //   "INSERT INTO users (firstname, lastname, email, password, isAdmin, isActif, username, adress, phone, codePostal, town, wilayaId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    //   [
    //     firstname,
    //     lastname,
    //     email,
    //     password,
    //     isAdmin,
    //     isActif,
    //     username,
    //     adress,
    //     phone,
    //     codePostal,
    //     town,
    //     wilayaId
    //   ],
    //   (err, result) => {
    //     if (err) {
    //       res.status(500).json(err);
    //     } else {
    //       res.status(200).json(result);
    //     }
    //   }
    // );
  },

  login: (req, res) => {
    const { email, password } = req.body;

    if (email == null || password == null) {
      return res.status(400).json({ error: "Missing Parameters" });
    }

    dbConnect.query(
      "SELECT * FROM Users WHERE email= ?",
      email,
      (err, user) => {
        if (err) {
          throw err;
        }
        if (user) {
          bcrypt.compare(password, user.password, (errBcpt, resBcpt) => {
            if (resBcpt) {
              console.log(userId);
              return res.status(200).json({
                userId: user.is
              });
            }
          });
        }
      }
    );
  }
};
