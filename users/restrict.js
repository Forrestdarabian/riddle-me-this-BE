const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "PRIVATE",
      (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Token Invalid" });
        } else {
          req.user = {
            username: decodedToken.username,
          };
          next();
        }
      }
    );
  } else {
    res.status(400).json({ message: "No Authorization token provided" });
  }
};
