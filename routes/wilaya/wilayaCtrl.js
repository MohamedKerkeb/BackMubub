const dbConnect = require("../../config/connect");

module.exports = {
  wilaya: (req, res, next) => {
    console.log("on affiche les wilaya");

    dbConnect.query("SELECT * FROM Wilaya", (err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({
          err: false,
          data: result,
          message: "voici les wilaya"
        });
      }
    });
  }
};
