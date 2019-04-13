const Sequelize = require('sequelize')

module.exports = new Sequelize('bd_evaluators2', 'postgres', 'qwerty123', {
    host: '35.226.14.139',
    port: 5432,
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