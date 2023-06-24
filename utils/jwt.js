const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'default-secret' } = process.env;
const JWT_EXPIRES = '7d';

const generateToken = (id) => jwt.sign({ _id: id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return err;
  }
};

module.exports = { generateToken, verifyToken };
