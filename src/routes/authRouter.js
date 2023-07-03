const { Router } = require("express");

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.redirect("/login");
});

authRouter.post("/sign-in", (req, res) => {
  res.json({ token: "this is token" });
});

authRouter.delete("/sign-out", (req, res) => {
  res.end();
});

authRouter.delete("/password", (req, res) => {
  res.end();
});

module.exports = authRouter;
