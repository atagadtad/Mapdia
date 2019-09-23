const express = require("express");
const router = express.Router();
const app = express();


module.exports = db => {
  router.post("/", (req, res) => {
    db.query(`
    SELECT longitude, latitude
    FROM pins
    JOIN maps ON map_id = maps.id;
    `)
      .then(data => {
        const users = data.rows;
        if (users[0].email === userEmail && users[0].password === userPassword) {
          res.render("user");
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

