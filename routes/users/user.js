const express = require("express");
const Router = express.Router();
const passport = require("passport");

const userControl = require("./userCtrl");
const us = require("./U");

// Router.post("/register", userControl.create);
// Router.get("/users", userControl.getUserById);
// Router.put("/users", userControl.updateUserById);
Router.post("/register", us.create);

// Login
Router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
});

// Logout
Router.get("/logout", (req, res) => {
  req.logOut(), res.redirect("/login");
});

module.exports = Router;
