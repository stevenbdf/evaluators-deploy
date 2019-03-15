const express = require('express')
const router = express.Router()
const Model = require('../models/model')


//Get locals list
router.get('/', async (req, res) => {
    try {
        let locals = await Model.Local.findAll()
        if (locals[0] == undefined) {
            res.json({
                status: 204,
                message: "No Content",
                msg: {
                }
            })
        } else {
            locals.forEach((item) => {
                item.handle = ''
            })
            console.log(req.connection.remoteAddress.split(':')[3] + ' locals findAll')
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    locals
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

//Update local
router.post('/update/:id', async (req, res) => {
    try {
        let local = await Model.Local.findByPk(req.params.id)
        if (local != null) {
            let obj = req.body.request.msg
            await Model.Local.update(
                {
                    lc_name: (obj.name === '') ? local.lc_name : obj.name
                }, {
                    returning: true,
                    where:
                    {
                        lc_id: req.params.id
                    }
                }
            )
            console.log(req.connection.remoteAddress.split(':')[3] + ' locals update by id ' + req.params.id)
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

//Delete locals
router.post('/delete', async (req, res) => {
    try {
        let obj = req.body.request.msg
        let local = await Model.Local.findByPk(obj.id)
        if (local == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            await Model.Local.destroy({
                where: {
                    lc_id: obj.id
                }
            })
            console.log(req.connection.remoteAddress.split(':')[3] + ' locals delete ' + obj.id)
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

//Add local
router.post('/add', async (req, res) => {
    try {
        let lc_name = req.body.request.msg.name
        if (lc_name.length == 0) {
            res.json({
                code: 411,
                message: "Length Required",
                msg: {}
            })
        } else {
            await Model.Local.create({ lc_name })
            console.log(req.connection.remoteAddress.split(':')[3] + ' locals add')
            res.json({
                code: 205,
                message: "Reset Content",
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

//findById
router.get('/findById/:id', async (req, res) => {
    try {
        let local = await Model.Local.findByPk(req.params.id)
        if (local == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            console.log(req.connection.remoteAddress.split(':')[3] + ' locals findById ' + req.params.id)
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    local
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

module.exports = router