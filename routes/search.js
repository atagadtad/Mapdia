const express = require("express");
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'user_id',
  keys: ['id']
}));


module.exports = db => {
  router.post("/", (req, res) => {
    console.log(req.body)
    db.query(`
    SELECT *
    FROM maps;
    `)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
