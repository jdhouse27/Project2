// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our user model
var db = require("../models");

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
};
