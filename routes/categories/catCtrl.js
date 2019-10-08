const dbConnect = require("../../config/connect");

module.exports = {
  getCategorie: (req, res, next) => {
    dbConnect.query("SELECT * FROM Categories", (err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({
          err: false,
          data: result,
          message: "Complet Categories"
        });
      }
    });
  }
};
