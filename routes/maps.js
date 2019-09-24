const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    values = [`camping`];
    db.query(`
    SELECT * FROM maps
    where category = $1;
    `, values)
      .then(data => {
        // console.log(data)
        const maps = data.rows;
        // console.log(maps);
        res.json({ maps });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/mapsubmission", (req, res) => {
    console.log('hai')
    db.query(`
    SELECT *
    FROM maps;
    `)
      .then(data => {
        res.sendStatus(200)
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  })


  return router;
};
