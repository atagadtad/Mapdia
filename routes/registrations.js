const express = require("express");
const router = express.Router();
//const app = express();

module.exports = db => {
  router.post("/", (req, res) => {
    db.query(
      `

    `
    )
      .then(users => {
        const user = users.rows;
        res.json({ coords });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
