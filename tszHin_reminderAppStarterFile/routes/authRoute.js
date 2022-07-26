const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated, ensureAuthenticated } = require("../middleware/checkAuth");
const router = express.Router();

router.get("/register", ensureAuthenticated, (req, res) => res.render("auth/register"));

router.post(
  "/register",
  passport.authenticate("local", {
    successRedirect: "/auth/login",
    failureRedirect: "/auth/register",
  })
)





router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
