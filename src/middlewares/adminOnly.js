const jwt = require("jsonwebtoken");

function adminOnly(req, res, next) {
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

    const isAdmin = jwtDecoded.isAdmin; // isAdmin: Boolean

    if (isAdmin) {
      res.status(403).json({
        error: "서비스 권한이 없습니다.",
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = adminOnly;
