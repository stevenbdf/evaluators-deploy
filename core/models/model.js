const Sequelize = require('sequelize')
const db = require('../config/database')

const Evaluator = db.define('evaluators', {
    ev_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ev_name: Sequelize.STRING,
    ev_email: {
        type: Sequelize.STRING,
        unique: true
    },
    ev_phone: Sequelize.STRING,
    ev_academic_level: Sequelize.STRING,
    ev_status: Sequelize.INTEGER,
    handle: Sequelize.STRING

}, {
        timestamps: false,
    }
)

const Level = db.define('levels', {
    lv_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, lv_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    handle: Sequelize.STRING
}, {
        timestamps: false,
    }
)

const Local = db.define('locals', {
    lc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, lc_name: {
        type: Sequelize.STRING,
        unique: true
    },
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
    sch_schedule: {
        type: Sequelize.STRING,
        unique: true
    },
    handle: Sequelize.STRING
}, {
        timestamps: false,
    }
)


const User = db.define('users', {
    us_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    us_name: {
        type: Sequelize.STRING,
        unique: true
    },
    us_lastname: Sequelize.STRING,
    us_email: Sequelize.STRING,
    us_password: Sequelize.STRING,
    handle: Sequelize.STRING,
}, {
        timestamps: false,
    }
)


const Course = db.define('courses', {
    cou_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cou_name: {
        type: Sequelize.STRING,
        unique: true
    },
    cou_teacher_guide: {
        type: Sequelize.STRING,
        unique: true
    },
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
    bin_return_code: {
        type: Sequelize.INTEGER,
        unique: true
    },
    bin_message: Sequelize.STRING,
    bin_datetime: Sequelize.DATE,
    handle: Sequelize.STRING,
}, {
        timestamps: false,
    }
)


Binnacle.belongsTo(User, { as: 'user', foreignKey: 'us_id' })
Evaluator.belongsTo(Schedule, { as: 'schedules', foreignKey: 'sch_id' })
Course.belongsTo(Local,{as:'local', foreignKey: 'lc_id'})
Course.belongsTo(Level,{as:'level', foreignKey: 'lv_id'})

module.exports = {
    Schedule,
    Evaluator,
    User,
    Binnacle,
    Level,
    Local,
    Course
}