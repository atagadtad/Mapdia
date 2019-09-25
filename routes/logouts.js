const express = require("express");
const router = express.Router();
// const cookieSession = require('cookie-session');

// router.use(cookieSession({
//   name: 'user_id',
//   keys: ['id']
// }));

module.exports = db => {
  router.get("/", (req, res) => {
    req.session = null;
    res.redirect("/homepage");
    db.query(
      `

    `,
      values
    )
      .then(data => {})
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
