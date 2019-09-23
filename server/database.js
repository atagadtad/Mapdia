const db = require('../lib/db')


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
  const values = [`${email}`]
  return db.query(`
  SELECT *
  FROM users
  WHERE users.email = $1;
  `, values)
    .then(res => res.rows[0]);
}

const getPin = function (id) {
  const values = [`${id}`]
  return db.query(`
  SELECT *
  FROM pins
  WHERE pins.id = $1;
  `, values)
  .then(res => res.rows[0]);
}
exports.getPin = getPin;
