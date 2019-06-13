module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    name: DataTypes.STRING
  });

  User.associate = function(models) {
    // Associating User with Event
    // When an User is deleted, also delete any associated Event
    User.hasMany(models.Events, {
      onDelete: "cascade"
    });
    User.hasMany(models.Yelp, {
      onDelete: "cascade"
    });
  };

  return User;
};
