const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {  // this page every can see (before login)
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => { // this page can only see after login
  res.render("dashboard", {
    user: req.user,
  });
});


module.exports = router;
