const express = require("express");
const router = express.Router();
const app = express();


module.exports = db => {
  router.get("/", (req, res) => {
    res.render("index");
  });
  router.get("/pins", (req, res) => {
    db.query(`
    SELECT *
    FROM pins;
    `)
      .then(data => {
        const pins = data.rows;
        console.log(pins)
        res.json({ data: pins })

      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/pins", (req, res) => {
    res.render("index");
  });
  // router.get('/pins', (req, res) => {
  //   res.send({markers:  [{lat: 21.213213, ling: 43.4345}, {lat: 42.2323, ling: 12.344}]})
  // })
  return router;
};
