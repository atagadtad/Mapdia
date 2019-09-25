const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    res.render("index");
  });
  router.get("/pins", (req, res) => {
    db.query(
      `
    SELECT *
    FROM pins;
    `
    )
      .then(data => {
        const pins = data.rows;
        console.log(pins);
        res.json({ data: pins });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/pinsCollection", (req, res) => {
    for (coord of req.body.data) {
      console.log("coord: ", coord);
      const values = [`${coord.lat}`, `${coord.lng}`, "2"];
      db.query(
        `
      INSERT INTO pins (latitude, longitude, map_id)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
        values
      ).then(res => {
        res.rows[0];
      });
    }
  });

  router.post("/getmap", (req, res) => {
    console.log(req.body.data);
    let values = [`${req.body.data}`];
    db.query(
      `
    SELECT latitude, longitude
    FROM pins
    JOIN maps ON map_id = maps.id
    WHERE map_id = $1;
    `,
      values
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
