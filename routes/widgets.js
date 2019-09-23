/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

<<<<<<< HEAD
const express = require("express");
=======
const express = require('express');
>>>>>>> e8cd9f092ca87a3847975c8386dd756a71f45956
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
    // console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
