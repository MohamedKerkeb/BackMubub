const express = require("express");
const Router = express.Router();

const userControl = require("./userCtrl");
const us = require("./U");

Router.post("/createUser", userControl.create);
Router.get("/users", userControl.getUserById);
Router.put("/users", userControl.updateUserById);
Router.post("/U", us.create);

module.exports = Router;
