const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const binn = require('./routes/binnacles.js')

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
app.set('trust proxy', true);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    next();
});


app.get('/', (request, response) => {
    response.json({
        message:binn.findAll
    })
})


app.use('/users', require('./routes/users'))
app.use('/evaluators', require('./routes/evaluators'))
app.use('/schedules', require('./routes/schedules'))
app.use('/binnacles', require('./routes/binnacles'))

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})