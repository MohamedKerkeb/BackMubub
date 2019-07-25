const express = require("express");
const Router = express.Router();

const advertController = require("./advertCtrl");

Router.post("/create", advertController.create);
Router.get("/advert", advertController.getAdvert);
Router.get("/search", advertController.searchAdvert);

module.exports = Router;
