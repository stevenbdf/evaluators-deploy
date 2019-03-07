const express = require('express')
const router = express.Router()
const db = require('../config/database')
const User = require('../models/User')

//Get user list
router.get('/', async (req, res) => {
    let users = await User.findAll();
    res.json({
        status: 200,
        message: "Success",
        msg:{
            users
        }
    })
})

//Add a user
router.post('/add', async (req, res) => {

    try {
        let obj = req.body.request.msg

        const data = {
            us_name: obj.name,
            us_lastname: obj.lastname,
            us_email: obj.email,
            us_password: obj.password,
        }

        let { us_name, us_lastname, us_email, us_password } = data

        await User.create({
            us_name,
            us_lastname,
            us_email,
            us_password
        })
        res.redirect('/users')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router