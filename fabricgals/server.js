const express = require("express");
// const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongojs = require("mongojs")
const mongoose = require("mongoose");
//mongo databaseurl and collections
// lines 8-13 .. is this in the server file or can i use the routes folder and reference it here.
const databaseurl = "fabricgals"
const collections = ["users","fabrics"];
const db = mongojs(databaseurl, collections);
db.on("error", error => {
  console.log("Database Error:", error);
});
// Routes.
app.use(express.static("routes"));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API r//Adding comments
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ffdatabase", { useNewUrlParser: true });


// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});