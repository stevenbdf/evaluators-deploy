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

app.use(function(req, res, next) {
    
    //to allow cross domain requests to send cookie information.
    res.header('Access-Control-Allow-Credentials', true);
    
    // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    
    // list of methods that are supported by the server
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    
        next();
    });


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