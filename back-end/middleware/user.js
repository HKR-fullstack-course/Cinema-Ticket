const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifyIsUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json("Access Denided");
  }

  try {
    const verified = jwt.verify(token, process.env.CLIENT_TOKEN);
    const user = await User.findById(verified._id);
    if (verified) {
      next();
    } else {
      return res.status(401).json("Access Denided");
    }
  } catch (err) {
    res.status(400).json("Invalid Token");
  }
};

module.exports = { verifyIsUser };
