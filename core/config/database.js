const Sequelize = require('sequelize')

module.exports = new Sequelize('bd_evaluators', 'evaluatorsDS', 'evaluatorssys', {
    host: '10.20.10.2',
    port:5432,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    operatorsAliases: false,
})

// const users = sequelize.define('users', {
//     us_id: { type: Sequelize.INTEGER, primaryKey: true },
//     us_name: Sequelize.STRING,
//     us_lastname: Sequelize.STRING,
//     us_email: Sequelize.STRING,
//     us_password: Sequelize.STRING,
// })

// users.findAll({ attributes: ['us_name', 'us_lastname', 'us_email', 'us_password'] })
//     .then(user => {
//         console.log(user)
//     })
//     .catch(err => {
//         console.log(err)
//     })