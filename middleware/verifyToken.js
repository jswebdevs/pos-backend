const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized Access: No token' });
  }

  jwt.verify(token, process.env.JWTSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized Access: Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
