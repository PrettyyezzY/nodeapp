const passport = require("passport");
var secured = require('../lib/middleware/secured');
const querystring = require("querystring");
require("dotenv").config();

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

const user_login = (passport.authenticate("auth0", { scope: "openid email profile" }), (req, res) => {
    res.redirect("/callback");
  });
const user_callback =( (req, res, next) => {
    passport.authenticate("auth0", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || "/");
      });
    })(req, res, next);
  });
const user_logout = ((req, res) => {
    req.logOut();
  
    let returnTo = req.protocol + "://" + req.hostname;
    const port = req.connection.localPort;
  
    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo =
        process.env.NODE_ENV === "production"
          ? `${returnTo}/`
          : `${returnTo}:${port}/`;
    }
  
    const logoutURL = new URL(
      `https://${process.env.AUTH0_DOMAIN}/v2/logout`
    );
  
    const searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo: returnTo
    });
    logoutURL.search = searchString;
  
    res.redirect(logoutURL);
  });
const user_profile = (secured(), function (req, res, next) {
    const { _raw, _json, ...userProfile } = req.user;
    console.log(req.user.nickname);
    res.render('user', {
      userProfile: JSON.stringify(userProfile, null, 2),
      title: 'Profile page'
    });
  });

  module.exports = { 
    user_login,
    user_callback,
    user_logout,
    user_profile
}