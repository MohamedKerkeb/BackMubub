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
  getUser: (req, res, next) => {
    console.log("get Users");
    dbConnect.query("SELECT * FROM users", (err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({
          err: false,
          data: result,
          message: "complet users"
        });
      }
    });
  }
};
