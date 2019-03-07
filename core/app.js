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

app.post('/', (request, response) => {
    console.log(request.body);
    response.send(request.body);
})


app.use('/users', require('./routes/users'))

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})