// Dependencies
// =============================================================

// Requiring our yelp model
var db = require("../models");
var Yelp = require("../config/yelpApi.js");
// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting events
  app.get("/api/user/", function(req, res) {
    db.Events.findAll({
      include: [db.Events]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Events
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Events]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //Catagories
  app.post("/api/yelp", function(req, res) {
    console.log(req.body);
    Yelp.search(req.body.searchNow, req.body.location).then(function(yelpResponse) {
      res.json(yelpResponse);
    });
  });
};
