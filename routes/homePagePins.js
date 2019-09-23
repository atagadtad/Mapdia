const express = require("express");
const router = express.Router();
const app = express();


module.exports = db => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT *
    FROM pins;
    `)
      .then(data => {
        const pins = data.rows;
        console.log(pins)
        res.render("index");

      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get('/pins', (req, res) => {
    res.send({markers:  [{lat: 21.213213, ling: 43.4345}, {lat: 42.2323, ling: 12.344}]})
  })
  return router;
};
