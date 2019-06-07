module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Event;
};
