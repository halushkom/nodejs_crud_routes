const dbConfig = require('../db/config')
const { Sequelize } = require('sequelize');

let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.projects = require('../models/Project.model')(sequelize, Sequelize)
db.users = require('../models/User.model')(sequelize, Sequelize)
db.users.hasMany(db.projects)
db.projects.belongsTo(db.users)
module.exports = db