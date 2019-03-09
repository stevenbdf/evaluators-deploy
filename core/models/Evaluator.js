const Sequelize = require('sequelize')
const db = require('../config/database')

const Evaluator = db.define('evaluators', {
    ev_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ev_name: Sequelize.STRING,
    ev_email: Sequelize.STRING,
    ev_phone: Sequelize.STRING,
    ev_academic_level: Sequelize.STRING,
    ev_status: Sequelize.INTEGER,
    sch_id: {
        type: Sequelize.STRING,
        references:'schedules',
        referencesKey:'sch_id',
    },
    handle: Sequelize.STRING

}, {
        timestamps: false,
    })

module.exports = Evaluator
