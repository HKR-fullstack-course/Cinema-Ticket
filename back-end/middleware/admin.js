const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");

const verifyIsAdmin = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json("Access Denided");
  }

  try {
    const verified = jwt.verify(token, process.env.CLIENT_TOKEN);
    const admin = await Admin.findById(verified._id);
    if (verified && admin) {
      next();
    } else {
      return res.status(401).json("Access Denided");
    }
  } catch (err) {
    res.status(400).json("Invalid Token");
  }
};

module.exports = { verifyIsAdmin };
