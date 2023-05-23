const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

connectDB();

const app = express();
const port = process.env.BACKEND_PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/petitions", require("./routes/petitionRoutes"));

app.listen(port, () => console.log("Started"));

// Google OAuth won't work with our custom errorHandler somehow
// app.use(errorHandler);

/*  PASSPORT SETUP  */
/* more at https://www.loginradius.com/blog/engineering/google-authentication-with-nodejs-and-passportjs/ */

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(
        `USER LOGGED IN: ${profile.displayName}, ${profile.emails[0].value}`
      );
      return done(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    const user = req.user;
    res.redirect(
      `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/auth?id=${
        user.id
      }&name=${user.displayName}&email=${user.emails[0].value}&photo=${
        (user.photos && user.photos[0].value) ||
        "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
      }`
    );
  }
);
