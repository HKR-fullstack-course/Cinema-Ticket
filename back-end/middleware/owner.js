const jwt = require("jsonwebtoken");

const varifyOwner = (req, res, next) => {
  const token = req.header("owner-token");
  if (!token) {
    return res.status(401).json("Access Denided");
  }

  try {
    const verified = jwt.verify(token, process.env.MY_TOKEN);
    if (verified.password == process.env.MY_PASSWORD) {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("Invalid Token");
  }
};

module.exports = { varifyOwner };
