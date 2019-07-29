const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const advert = require("./config/connect");
const advertRoute = require("./routes/advert/advert");
const wilayaRoute = require("./routes/wilaya/wilaya");
const usersRoute = require("./routes/users/user");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", advertRoute);
app.use("/", wilayaRoute);
app.use("/", usersRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`the magic is happend in ${PORT}`);
});
