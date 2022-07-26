const express = require("express");
const passport = require("../middleware/passport").local_login;
const passport_github = require("../middleware/passport").github;
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



router.get('/auth/github',
   passport_github.authenticate('github', { scope: [ 'user:email' ] }));

 router.get('/github/callback', 
   passport_github.authenticate('github', { failureRedirect: '/auth/login' }),
   function(req, res) {
     console.log(req.user.name)
     // Successful authentication, redirect to dashboard.
     res.render('dashboard', {
       user: req.user.name
     });
   });



 router.get("/dashboard", ensureAuthenticated, (req, res) => {
   res.render("dashboard", {
     user: req.user,
   });
 });



router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
