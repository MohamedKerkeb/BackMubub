const express = require("express");
const Router = express.Router();

const catController = require("./catCtrl");

Router.get("/categories", catController.getCategorie);

module.exports = Router;
