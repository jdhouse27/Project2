module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        text: DataTypes.STRING,
        description: DataTypes.TEXT
    });
    return Category;
};