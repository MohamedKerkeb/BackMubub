const dbConnect = require("../../config/connect");

module.exports = {
  create: (req, res, next) => {
    console.log("create a users");
    const {
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
    } = req.body;
    console.log(dbConnect);

    dbConnect.query(
      "INSERT INTO users (firstname, lastname, email, password, isAdmin, isActif, username, adress, phone, codePostal, town, wilayaId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
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
          res.status(500).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  },
  getUserById: (req, res, next) => {
    console.log("get Users");
    dbConnect.query(
      "SELECT * FROM users WHERE idusers = ?",
      req.query.id,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send({
            err: false,
            data: result,
            message: "complet users"
          });
        }
      }
    );
  },
  updateUserById: (req, res, next) => {
    const body = req.body;
    dbConnect.query(
      "UPDATE users SET ? WHERE idusers = ?",
      [body, req.query.id],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send({
            err: false,
            data: result,
            message: "update user reussi"
          });
        }
      }
    );
  }
};
