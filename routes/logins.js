const express = require("express");
const router = express.Router();
const app = express();


module.exports = db => {
  app.post("/login", (req, res) => {
    res.render("user");
  })


  router.post("/login", (req, res) => {
    db.query(`SELECT * FROM maps;`)
      .then(data => {
        console.log(data)
        const users = data.rows;
        res.render("user");
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};




// app.post("/login", (req, res) => {
//   res.render("user");
//  })
