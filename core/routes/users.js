const express = require('express')
const router = express.Router()
const db = require('../config/database')
const User = require('../models/User')

//Get user list
router.get('/', (req, res) =>
    User.findAll()
        .then(users => {
            console.log(users)
            res.sendStatus(200)
        })
        .catch(err => console.log(err)))

router.get('/add', (req, res) => res.render('add'))

//Add a user
router.post('/add', (req, res) => {
    const data = {
        us_name: 'Carlos',
        us_lastname: 'Diaz',
        us_email: 'carlos.diaz@gmail.com',
        us_password: 'morro 123',
    }

    let{us_name, us_lastname, us_email, us_password}=data

    User.create({
        us_name,
        us_lastname,
        us_email,
        us_password
    })
        .then(user => res.redirect('/users'))
        .catch( err => console.log(err))

})


module.exports = router