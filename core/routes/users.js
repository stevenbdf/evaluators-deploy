const express = require('express')
const router = express.Router()
const Model = require('../models/model')

//Get user list
router.get('/', async (req, res) => {
    let users = await Model.User.findAll();
    if (users[0] == undefined) {
        res.json({
            status: 204,
            message: "No Content",
            msg: {                
            }
        })
    } else {
        res.json({
            status: 200,
            message: "Ok",
            msg: {
                users
            }
        })
    }
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
        res.json({
            code: 205,
            message: "Reset Content",
            msg: {}
        })
    } catch (err) {
        res.json({
            code: 400,
            message: " Bad Request",
            msg:{
                description:""
            }
        })
    }
})

//findById


module.exports = router