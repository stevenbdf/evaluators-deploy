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
        console.log(req.connection.remoteAddress.split(':')[3]+' users findAll')
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

        await Model.User.create({
            us_name,
            us_lastname,
            us_email,
            us_password
        })
        console.log(req.connection.remoteAddress.split(':')[3]+' users add')
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
                description:err
            }
        })
    }
})

//findById
router.get('/findById/:id', async (req, res) => {
    try {
        let user = await Model.User.findByPk(req.params.id)
        if (user == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            console.log(req.connection.remoteAddress.split(':')[3]+' users findById '+req.params.id)
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    user
                }
            })
        }
    } catch (err) {
        res.json({
            code: 400,
            message: " Bad Request",
            msg: {
                description: err
            }
        })
    }
})

//delete user
router.post('/delete', async (req, res) => {
    try {
        let obj = req.body.request.msg
        let user = await Model.User.findByPk(obj.id)
        if (user == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            await Model.User.destroy({
                where: {
                    us_id: obj.id
                }
            })
            console.log(req.connection.remoteAddress.split(':')[3]+' users delete '+obj.id)
            res.json({
                code: 205,
                message: "Reset Content",
                msg: {}
            })
        }
    } catch (err) {

        res.json({
            code: 400,
            message: " Bad Requested",
            msg: {
                description: err
            }
        })
    }
})

//update user
router.post('/update/:id', async (req, res) => {
    try {
        let user = await Model.User.findByPk(req.params.id)
        if (user != null) {
            let obj = req.body.request.msg
            await Model.User.update(
                {
                    us_name: (obj.name === '') ? user.us_name : obj.name,
                    us_lastname: (obj.lastname === '') ? user.us_lastname : obj.lastname,
                    us_email: (obj.email === '') ? user.us_email : obj.email,
                    us_password: (obj.password === '') ? user.us_password : obj.password,
                }, {
                    returning: true,
                    where:
                        {
                            us_id: req.params.id
                        }
                }
            )
            console.log(req.connection.remoteAddress.split(':')[3]+' users update '+req.params.id)
            res.json({
                code: 205,
                message: "Reset Content",
                msg: {}
            })
        } else {
            res.json({
                code: 404,
                message: "Not found",
                msg: {}
            })
        }
    } catch (err) {
        res.json({
            code: 400,
            message: " Bad Request",
            msg: {
                description: err
            }
        })
    }
})

module.exports = router