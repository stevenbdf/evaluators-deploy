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
    try {
        var objeto = request.body;
        console.log('Sintaxis Correcta');
        response.json({
            status: "success",
            message: objeto.hello
        })
    }
    catch (error) {
        if(error instanceof SyntaxError) {
            let mensaje = error.message;
            console.log('ERROR EN LA SINTAXIS:', mensaje);
        } else {
            throw error;
        }
    }
})


app.use('/users', require('./routes/users'))
app.use('/evaluators', require('./routes/evaluators'))

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})