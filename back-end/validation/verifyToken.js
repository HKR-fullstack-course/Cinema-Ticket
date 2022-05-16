const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  console.log(req);
  if (!token) {
    return res.statue(401).json("Access Denided");
  }

  try {
    console.log(token);
    const verified = jwt.verify(token, process.env.API_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.statue(400).json("Invalid Token");
  }
};
