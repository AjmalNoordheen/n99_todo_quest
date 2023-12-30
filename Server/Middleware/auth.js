const jwt = require("jsonwebtoken");

// ======== GENERATE TOKEN ==========

const generateToken = (email) => {
  try {
    const secretKey = "t9rXw5bF2mS7zQ8p";

    const token = jwt.sign(
      { email:email,role: "user" },
      secretKey
    );
    return token;
  } catch (error) {
    console.log(error);
    res.json(500);
  }
};

// =============== VERIFY USER TOKEN ============

const verifyToken = async (req, res, next) => {
  let token = req.header("Authorization");
  const secretKey = "t9rXw5bF2mS7zQ8p";

  try {
    if (!token) {
      return res.status(404).json({
        status: false,
        token: false,
        message: "Authentication failed: no token provided.",
      });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, secretKey);
    if (verified) {
      next();
    } else {
      res.json({
        status: false,
        token: false,
        message: "Authentication failed: no token provided.",
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      message: "Authentication failed: invalid token.",
    });
  }
};

module.exports = { generateToken, verifyToken };
