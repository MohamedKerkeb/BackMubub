const express = require("express");
const Router = express.Router();

const wilayaController = require("./wilayaCtrl");

Router.get("/wilaya", wilayaController.wilaya);

module.exports = Router;
