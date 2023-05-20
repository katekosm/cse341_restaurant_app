const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");

const port = process.env.PORT || 8080;
const app = express();

// Passport, for Google Authentication
const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const customer = require("./controllers/customers");

app
  .use(bodyParser.json())
  // This is the basic express session({..}) initialization.
  .use(
    session({
      secret: "110",
      resave: false,
      saveUninitialized: true,
    })
  )
  // init Passport on every route call.
  .use(passport.initialize())
  // allow Passport to use "express-session".
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/logged-status", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out"
  );
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  customer.createCustomer  
);

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
