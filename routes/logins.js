const express = require("express");
const router = express.Router();
const app = express();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'user_id',
  keys: ['id']
}));


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
        if (users[0].email === userEmail && users[0].password === userPassword) {
          res.render("user");
          req.session.user_id = users[0].id;
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

