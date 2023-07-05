const jwt = require("jsonwebtoken");

function loginRequired(req, res, next) {
  const token = req.headers["authorization"].slice(7);

  if (!token || token === "null") {
    res.status(401).json({
      error: "인증되지 않은 유저입니다. 로그인 해주세요.",
    });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret";
    const jwtDecoded = jwt.verify(token, secretKey);

    const userEmail = jwtDecoded.userEmail; // userEmail: String
    req.userEmail = userEmail;

    next();
  } catch (error) {
    res.status(401).json({
      error: "인증되지 않은 유저입니다. 로그인 해주세요.",
    });
  }
}

module.exports = loginRequired;
