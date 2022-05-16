const bcrypt = require("bcryptjs");

const verifyOwner = async (req, res, next) => {
  const token = req.header("owner-pwd");
  if (!token) {
    return res.status(401).json("Access Denided");
  }

  try {
    const verified = await bcrypt.compare(process.env.MY_PASSWORD, token);
    if (verified) {
      next();
    } else {
      return res.status(401).json("Access Denided");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("Invalid Token");
  }
};

module.exports = { verifyOwner };
