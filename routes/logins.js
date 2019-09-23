const express = require("express");
const router = express.Router();
const app = express();


module.exports = db => {
  router.post("/", (req, res) => {
    const values = [`${req.body.email}`]
    db.query(`
    SELECT *
    FROM users
    WHERE users.email = $1;
    `, values)
      .then(data => {
        const users = data.rows;
        console.log(users)
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
