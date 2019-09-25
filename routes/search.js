const express = require("express");
const router = express.Router();
//

module.exports = db => {
  router.post("/", (req, res) => {
    let userSearch = req.body;
    console.log(userSearch.search);
    const values = [`%${userSearch.search}%`];
    db.query(
      `
    SELECT maps.id
    FROM maps
    WHERE lower(description) LIKE $1;
    `,
      values
    )
      .then(data => {
        res.send(data.rows);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
