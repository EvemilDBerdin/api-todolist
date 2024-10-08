'use strict';


const fs = require('fs');
const path = require('path');
require('dotenv').config(); 
const Sequelize = require('sequelize');
const process = require('process'); 
const basename = path.basename(__filename);
const db = {};
const env = process.env.NODE_ENV || 'development';  

// Function to safely get environment variables
const getEnvVar = (key) => {
  const fullKey = `${env.toUpperCase()}_${key}`;
  const value = process.env[fullKey];
  
    if (value === undefined) {
        console.error(`Environment variable ${env.toUpperCase()}_${key} is not defined`);
        process.exit(1);
    }
    return value;
};

const config = {
    username: getEnvVar('USERNAME'),
    password: getEnvVar('PASSWORD'),
    database: getEnvVar('DATABASE'),
    host: getEnvVar('HOST'),
    dialect: getEnvVar('DIALECT')
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
