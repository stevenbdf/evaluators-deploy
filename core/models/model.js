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

const User = db.define('users', {
    us_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    us_name: Sequelize.STRING,
    us_lastname: Sequelize.STRING,
    us_email: Sequelize.STRING,
    us_password: Sequelize.STRING,
    handle: Sequelize.STRING,
}, {
        timestamps: false,
    }
)

const Binnacle = db.define('binnacles', {
    bin_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bin_return_code: Sequelize.INTEGER,
    bin_message: Sequelize.STRING,
    bin_datetime: Sequelize.DATE,
    handle: Sequelize.STRING,
}, {
        timestamps: false,
    }
)

Binnacle.belongsTo(User , {as: 'user', foreignKey: 'us_id'})
Evaluator.belongsTo(Schedule, { as: 'schedule', foreignKey: 'sch_id' })

module.exports = {
    Schedule,
    Evaluator, 
    User,
    Binnacle
}