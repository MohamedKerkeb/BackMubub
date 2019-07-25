const dbConnect = require("../../config/connect");

module.exports = {
  create: (req, res, next) => {
    console.log("Trying to create a advert");
    const {
      title,
      description,
      price,
      categoriesId,
      usersId,
      wilayaId
    } = req.body;

    dbConnect.query(
      "INSERT INTO annonces (title, description, price, categoriesId, usersId, wilayaId) VALUES (?,?,?,?,?,?)",
      [title, description, price, categoriesId, usersId, wilayaId],
      (err, result) => {
        // advert.end();
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );

    console.log(title, description, price, categoriesId, usersId, wilayaId);
    // res.end();
  },
  getAdvert: (req, res, next) => {
    console.log("Get all Advert");
    const { title, wilaya, town, price, description } = req.body;

    dbConnect.query("SELECT * FROM annonces LIMIT 20", (err, result) => {
      // advert.end();
      if (err) {
        // res.status(500).json(err);
        throw err;
      } else {
        res.status(200).send({
          err: false,
          data: result,
          message: "complet advert"
        });
        // res.status(200).json(result);
      }
    });
    // res.end();
  },
  searchAdvert: (req, res, next) => {
    //console.log("search advert");
    let { wilayaId, categoriesId } = req.query;
    //console.log(wilayaId, categoriesId);
    // wilayaId = 16;
    // categoriesId = 6;
    dbConnect.query(
      "SELECT * FROM annonces WHERE wilayaId = ? && categoriesId = ?",
      [wilayaId, categoriesId],
      //console.log(wilayaId, categoriesId),
      (err, result) => {
        if (err) {
          throw err;
        } else {
          if (result === null) {
            res.status(500).send({
              data: "Il n'y pas d'annonce"
            });
          } else {
            res.status(200).send({
              err: false,
              data: result,
              message: "recherche"
            });
          }
        }
      }
    );
  }
};
