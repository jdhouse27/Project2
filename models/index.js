"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
const axios = require("axios")
const apiKey = "9ZTuDD68Yi8CmDzvrb3hO-qQYAcmgBql8tlVh6aTESCsam16plhzwOoKxKcaMezfSG3qmgobKCtVdxU7jkWtrU7hpQZQgdb2j90pBrltCWjr7uXod3ASbACe4e76XHYx"
const auth = {
    'Authorization': 'Bearer ' + apiKey
}

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    var sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-4) === ".js"
        );
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;