const Sequelize = require('sequelize')
const db = require('../config/database')

const User = db.define('users', {
    us_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    us_name: Sequelize.STRING,
    us_lastname: Sequelize.STRING,
    us_email: Sequelize.STRING,
    us_password: Sequelize.STRING,
},{
    timestamps: false,
})

module.exports = User