const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");

router.use(
  cookieSession({
    name: "user_id",
    keys: ["id"]
  })
);

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

    let textArea = req.body.textsubmit;
    let dropMenu = req.body.dropdown;
    let userID = req.session.user_id;

    const values = [textArea, dropMenu, userID]
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
