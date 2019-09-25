const express = require("express");
const router = express.Router();
//const app = express();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(
      `
    SELECT latitude, longitude
    FROM pins
    JOIN maps ON map_id = maps.id
    WHERE map_id = 1;
    `
    )
      .then(pins => {
        const coords = pins.rows;
        res.json({ coords });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
