module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Events;
};
