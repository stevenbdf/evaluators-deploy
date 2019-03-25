const Sequelize = require('sequelize')

module.exports = new Sequelize('bd_evaluators', 'evaluatorsDS', 'evaluatorssys', {
    host: '35.224.90.211',
    port:5432,
    logging: false,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    operatorsAliases: false,
})