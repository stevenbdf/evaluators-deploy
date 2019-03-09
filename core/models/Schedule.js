const Sequelize = require('sequelize')
const db = require('../config/database')
const Evaluator = require('../models/Evaluator')

const Schedule = db.define('schedules', {
    sch_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    sch_shedule: Sequelize.STRING,
},{
    timestamps: false,
})
Evaluator.hasOne(Schedule)

module.exports = Schedule