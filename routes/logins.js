const express = require("express");
const router = express.Router();
const app = express();


module.exports = db => {
  router.post("/", (req, res) => {
    userEmail = req.body.email;
    userPassword = req.body.password;
    const values = [userEmail, userPassword]
    db.query(`
    SELECT *
    FROM users
    WHERE users.email = $1 AND users.password = $2;
    `, values)
      .then(data => {
        const users = data.rows;
        console.log(users[0].email)
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
