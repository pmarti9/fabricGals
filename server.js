const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");

const PORT = process.env.PORT || 3000;


const db = require("./models");
const app = express();
// Routes.

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("routes"));
// Serve up static assets (usually on heroku)
if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
//requiring routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

app.use(express.static("public"));
//syncing daatabase, logging message to user
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

