const Sequelize = require('sequelize')
const db = require('../config/database')

const User = db.define('evaluators', {
    ev_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    ev_name: Sequelize.STRING,
    ev_email: Sequelize.STRING,
    ev_phone: Sequelize.STRING,
},{
    timestamps: false,
})

module.exports = User