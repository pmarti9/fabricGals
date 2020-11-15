// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
//send them directly to the landing page
  app.get("/", (req, res) => {
    res.render("home",{});
  });
  
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup",{});
  });
  
  //when user clicks on view profile
  app.get("/user", isAuthenticated, (req, res) => {
    res.render("user",{});
  });

  app.get("/listItems", isAuthenticated, (req, res) => {
    res.render("listItems",{});
  });

  //

  
  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members",{});
  });

  //Route for search sales
  app.get("/searchFabric", isAuthenticated, (req, res) => {
    res.render("searcFabric",{});
  });

  //Route for create sales
  app.get("/createsale", isAuthenticated, (req, res) => {
    res.render("createsale",{});
  });

  
};
//we need to modify this to include the new html pages, to match our html routes.  we can keep the login stuff the same because we will be using that i believe on top of it. 