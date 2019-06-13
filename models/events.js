module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eventAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    eventCategory: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
    // active: DataTypes.BOOLEAN,
    // userId: DataTypes.INTEGER
  });

  Events.associate = function(models) {
    // We're saying that an Event should belong to an User
    // A Event can't be created without an User due to the foreign key constraint
    Events.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Events;
};
