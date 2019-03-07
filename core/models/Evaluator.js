const Sequelize = require('sequelize')
const db = require('../config/database')

<<<<<<< HEAD
const User = db.define('evaluators', {
=======
const Evaluator = db.define('evaluators', {
>>>>>>> 272950401ecb256c4babe8381960a75160765e14
    ev_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    ev_name: Sequelize.STRING,
    ev_email: Sequelize.STRING,
    ev_phone: Sequelize.STRING,
<<<<<<< HEAD
=======
    ev_academic_level: Sequelize.STRING,
    ev_horary: Sequelize.STRING,
    ev_status: Sequelize.INTEGER,
    
>>>>>>> 272950401ecb256c4babe8381960a75160765e14
},{
    timestamps: false,
})

<<<<<<< HEAD
module.exports = User
=======
module.exports = Evaluator
>>>>>>> 272950401ecb256c4babe8381960a75160765e14
