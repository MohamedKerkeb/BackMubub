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
      wilayaId,
      img1,
      img2
    } = req.body;

    dbConnect.query(
      "INSERT INTO Annonces (title, description, price, categoriesId, usersId, wilayaId, img1, img2) VALUES (?,?,?,?,?,?)",
      [title, description, price, categoriesId, usersId, wilayaId, img1, img2],
      (err, result) => {
        // advert.end();
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );

    console.log(
      title,
      description,
      price,
      categoriesId,
      usersId,
      wilayaId,
      img1,
      img2
    );
    // res.end();
  },
  getAdvert: (req, res, next) => {
    console.log("Get all Advert");
    const { title, wilaya, town, price, description } = req.body;

    dbConnect.query("SELECT * FROM Annonces LIMIT 20", (err, result) => {
      // advert.end();
      if (err) {
        // res.status(500).json(err);
        throw err;
      } else {
        res.status(200).send({
          err: false,
          data: result ? result : "pas encore d annoce",
          message: "complet advert"
        });
        // res.status(200).json(result);
      }
    });
    // res.end();
  },

  // Mise en place de la recherche via wilaya
  // searchAdvert: (req, res, next) => {
  //   let { wilayaId, categoriesId, title } = req.query;
  //   let valueTitle = req.body.tilte;
  //   dbConnect.query(
  //     "SELECT * FROM annonces WHERE wilayaId = ? && categoriesId = ? && title LIKE ?",
  //     [wilayaId, categoriesId, "%" + title + "%"],
  //     (err, result) => {
  //       if (err) {
  //         throw err;
  //       } else {
  //         if (result === null) {
  //           res.status(500).send({
  //             data: "Il n'y pas d'annonce"
  //           });
  //         } else {
  //           res.status(200).send({
  //             err: false,
  //             data: result,
  //             message: "recherche"
  //           });
  //         }
  //       }
  //     }
  //   );
  // },

  //Teste poour les Recherche
  searchAdvert: (req, res, next) => {
    let { wilayaId, categoriesId, title } = req.query;
    let colle = "SELECT * FROM Annonces";

    const allSearch = `SELECT * FROM Annonces WHERE wilayaId = ${wilayaId} && categoriesId = ${categoriesId} && title LIKE "%${title}%"`;

    const secondSearch = `SELECT * FROM Annonces WHERE wilayaId = ${wilayaId} && categoriesId = ${categoriesId} `;

    if (wilayaId !== "" && categoriesId !== "" && title !== "") {
      colle = allSearch;
    } else if (wilayaId !== "" && categoriesId !== "" && title == "") {
      colle = secondSearch;
    }

    dbConnect.query(colle, (err, result) => {
      console.log(colle);
      if (err) {
        throw err;
      } else {
        res.status(200).send({
          err: false,
          data: result,
          message: "test message"
        });
      }
    });
  },

  // MISE A JOUR DES ANNONCES
  // recuperations de toutes les annonces de l'useur avec son id
  getAdvertByUserId: (req, res, next) => {
    const id = req.query.usersId;
    dbConnect.query(
      "SELECT * FROM Annonces WHERE usersId= ?",
      id,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send({
            err: false,
            data: result,
            message: "recupere les donnée reussit"
          });
        }
      }
    );
  },

  // Choix de l'annonces via l'id de l'user et de l'annonce
  getAdvertById: (req, res, next) => {
    const { usersId, idannonces } = req.query;

    dbConnect.query(
      "SELECT * FROM Annonces WHERE usersId = ? && idannonces = ?",
      [usersId, idannonces],
      //[2, 3],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send({
            err: false,
            data: result,
            message: "recuperation de l annonce reussit"
          });
        }
      }
    );
  },

  // mise a jour de l'annonces choisit par l'user
  putAdvert: (req, res, next) => {
    const { idannonces, usersId } = req.query;
    const body = req.body;
    dbConnect.query(
      "UPDATE Annonces SET ? WHERE idannonces = ? && usersId = ?",
      [body, idannonces, usersId],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send({
            err: false,
            data: result,
            message: "update reussi"
          });
        }
      }
    );
  }
};
