const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    values = [`camping`];
    db.query(`
    SELECT * FROM maps
    where category = $1;
    `,values)
      .then(data => {
        // console.log(data)
        const maps = data.rows[0];
        console.log(maps);
        res.json({ maps });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
