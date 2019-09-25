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
    SELECT maps
    FROM maps
    WHERE lower(description) LIKE $1 AND lower(category) LIKE $1;
    `,
      values
    )
      .then(data => {
        console.log(data.rows)
        res.send(data.rows);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
