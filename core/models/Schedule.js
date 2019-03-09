const Sequelize = require('sequelize')
const db = require('../config/database')

const Schedule = db.define('schedules', {
    sch_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    sch_schedule: Sequelize.STRING,
},{
    timestamps: false,
})

module.exports = Schedule