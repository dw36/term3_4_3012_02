const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy - require("passport-github2").Strategy;
const userController = require("../controllers/userController");
require('dotenv').config()
const GITHUB_CLENT_ID = process.env.GITHB_CLIENT_ID;
const GITHUB_CLENT_SECRET = process.env.GITHUB_CLENT_SECRET;
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
                                  //to scan the database if any user is matched
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const local_login = passport.use(localLogin)

const GitHub = new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
    // Check if User exists in the database
  const user = userController.getUserByUser(profile.displayName);
  return user
    ? done(null, user)
    : done(null, false, {
        message: "Your login details are not valid. Please try again",
      }); 
}
);

const github = passport.use(GitHub)

passport.serializeUser(function (user, done) {
  console.log(user)
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = {local_login, github};
