// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);
app.use(express.static("public"));
const apiRoutes = require("./");
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const pinsRoutes = require("./routes/pins");
const mapsRoutes = require("./routes/maps");
const favoritesRoutes = require("./routes/favorites");
const loginRoutes = require("./routes/logins");
const homePagePinsRoutes = require("./routes/homePagePins");
const mapIDsRoutes = require("./routes/mapIDs");
const registrationRoutes = require("./routes/registrations");
const logoutRoutes = require("./routes/logouts");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/api/pins", pinsRoutes(db));
app.use("/maps", mapsRoutes(db));
app.use("/api/favorites", favoritesRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/", homePagePinsRoutes(db));
app.use("/mapID", mapIDsRoutes(db));
app.use("/registration", registrationRoutes(db));
app.use("/logout", logoutRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/homepage", (req, res) => {
  res.render("homepage");
});

app.get("/login", (req, res) => {
  res.render("user");
});

app.get("/collections", (req, res) => {
  res.render("collections");
});

app.get("/map", (req, res) => {
  res.render("map");
});

app.post("/login", (req, res) => {
  res.render("user");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
