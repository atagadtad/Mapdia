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
  return router;
};
