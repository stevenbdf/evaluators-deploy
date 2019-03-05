const Sequelize = require('sequelize')

const sequelize = new Sequelize('bd_evaluators', 'evaluatorsDS', 'evaluatorssys', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
})

sequelize.authenticate()
    .then(() => {
        console.log('Conectado')
    })
    .catch(err => {
        console.log('No se conecto')
    })

const users = sequelize.define('users', {
    us_id: { type: Sequelize.INTEGER, primaryKey: true },
    us_name: Sequelize.STRING,
    us_lastname: Sequelize.STRING,
    us_email: Sequelize.STRING,
    us_password: Sequelize.STRING,
})

users.findAll({ attributes: ['us_name', 'us_lastname', 'us_email', 'us_password'] })
  .then(user => {
    console.log(user)
  })
  .catch(err => {
    console.log(err)
  })