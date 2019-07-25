const express = require("express");
const Router = express.Router();

const userControl = require("./userCtrl");

Router.post("/createUser", userControl.create);
Router.get("/users", userControl.getUser);

module.exports = Router;
