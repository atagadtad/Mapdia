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
  router.post("/pinsCollection", (req, res) => {
    let coords = req.body.data[0]
    console.log(coords.lat, coords.lng)
    const values = [`${coords.lng}`, `${coords.lat}`, '1'];
    return db.query(`
    INSERT INTO pins (longitude, latitude, map_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, values)
      .then(res => { res.rows[0] })
  });
  return router;
};
