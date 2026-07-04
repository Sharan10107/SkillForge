const crypto = require('crypto');

// Generates a URL-safe token used for email verification / password reset links.
const generateToken = () => crypto.randomBytes(32).toString('hex');

// Hashes a token before storing it in the DB, so a leaked DB dump alone
// can't be used to reset someone's password.
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

module.exports = { generateToken, hashToken };
