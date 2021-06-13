const { Sequelize } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('projects', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        duration: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userID: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    })
}