const Sequelize = require('sequelize')
const db = require('../config/database')

const Evaluator = db.define('evaluators', {
    ev_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    ev_name: Sequelize.STRING,
    ev_email: Sequelize.STRING,
    ev_phone: Sequelize.STRING,
    ev_academic_level: Sequelize.STRING,
    ev_horary: Sequelize.STRING,
    ev_status: Sequelize.INTEGER,
    
},{
    timestamps: false,
})

module.exports = Evaluator