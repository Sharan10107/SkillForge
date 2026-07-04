const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

const signAccessToken = (userId) =>
  jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiresIn });

module.exports = { signAccessToken };
