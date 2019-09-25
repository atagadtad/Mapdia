const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
//const app = express();

module.exports = db => {
  router.post("/", (req, res) => {
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 10);
    db.query(
      `
    INSERT INTO users (email, password)
    VALUES ($1, $2);
    `, [email, password])
      .then(users => {
        const user = users.rows;
        res.redirect('/');
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
