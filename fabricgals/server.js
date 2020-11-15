const express = require("express");
// const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
//mongo databaseurl and collections
// lines 8-13 .. is this in the server file or can i use the routes folder and reference it here.

const db = require("./models")
// Routes.
const app = express();
app.use(express.static("routes"));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
    );
    app.use(passport.initialize());
    app.use(passport.session());


    require("./routes/html-routes.js")(app);
  require("./routes/api-routes.js")(app);
  
  app.use(express.static("public"));
// Define API r//Adding comments

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

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});