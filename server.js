const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const logger = require("morgan");

const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const advert = require("./config/connect");
const advertRoute = require("./routes/advert/advert");
const wilayaRoute = require("./routes/wilaya/wilaya");
const usersRoute = require("./routes/users/user");
const categoriesRoute = require("./routes/categories/categorie");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(logger("dev"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Routes
app.use("/", advertRoute);
app.use("/", wilayaRoute);
app.use("/", usersRoute);
app.use("/", categoriesRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`the magic is happend in ${PORT}`);
});
