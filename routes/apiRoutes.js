// Requiring our models and passport as we've configured it
let db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });


  // route to get all items
  app.get("/api/items", (req, res) => {
    let query =  {};
    if (req.query.seller_id) {
      query.SellerId =  req.query.seller_id;
    }
    db.Items.findAll({
      where: query,
      include: [db.Seller]
    }).then(function(dbSeller){
      res.json(dbSeller);
    })
  })
  // route to get a spcific item
  app.get("/api/items/:id", (req, res) => {
    db.Items.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Seller]
    }).then(function(dbSeller){
      res.json(dbSeller);
    })
  })
//route to post an item
app.post("/api/items", function(req, res){
  db.Items.create({
    itemName: req.body.itemName,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    photo: req.body.photo,
  }
    ).then(function(dbItems){
    res.json(dbItems);
  })
})

app.delete("/api/items/:id", (req,res) => {
  db.Items.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbItems){
    res.json(dbItems);
  })
})

app.put("/api/items", (req, res) => {
  db.Items.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function(dbItems){
      res.json(dbItems)
    })
})



  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
