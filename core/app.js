const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const port = 3001

const db = require('./config/database')

db.authenticate()
    .then(() => {
        console.log('Conectado')
    })
    .catch(err => {
        console.log('No se conecto')
    })

const app = express()

app.use(express.json());

app.get('/', (request, response) => {
    response.json({
        message: "Hola mundo"
    })
})


app.use('/users', require('./routes/users'))
app.use('/evaluators', require('./routes/evaluators'))
app.use('/schedules', require('./routes/schedules'))

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})