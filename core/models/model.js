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
    handle: Sequelize.STRING

}, {
        timestamps: false,
    }
)


const Schedule = db.define('schedules', {
    sch_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sch_schedule: Sequelize.STRING,
    handle: Sequelize.STRING
}, {
        timestamps: false,
    }
)

Evaluator.belongsTo(Schedule, {as: 'schedules', foreignKey: 'sch_id'})

module.exports =  {
    Schedule,
    Evaluator
}