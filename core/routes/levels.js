const express = require('express')
const router = express.Router()
const Model = require('../models/model')


//Get levels list
router.get('/', async (req, res) => {
    try {
        let level = await Model.Level.findAll()
        if (level[0] == undefined) {
            res.json({
                status: 204,
                message: "No Content",
                msg: {
                }
            })
        } else {
            level.forEach((item) => {
                item.handle = ''
            })
            console.log(req.connection.remoteAddress.split(':')[3] + ' levels findAll')
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    level
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

//Update level
router.post('/update/:id', async (req, res) => {
    try {
        let level = await Model.Level.findByPk(req.params.id)
        if (level != null) {
            let obj = req.body.request.msg
            await Model.Level.update(
                {
                    lv_name: (obj.name === '') ? level.lv_name : obj.name
                }, {
                    returning: true,
                    where:
                    {
                        lv_id: req.params.id
                    }
                }
            )
            console.log(req.connection.remoteAddress.split(':')[3] + ' schedules update by id ' + req.params.id)
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

//Delete schedule
router.post('/delete', async (req, res) => {
    try {
        let obj = req.body.request.msg
        let sch = await Model.Level.findByPk(obj.id)
        if (sch == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            await Model.Level.destroy({
                where: {
                    lv_id: obj.id
                }
            })
            console.log(req.connection.remoteAddress.split(':')[3] + ' schedules delete ' + obj.id)
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

//Add level
router.post('/add', async (req, res) => {
    try {
        let lv_name = req.body.request.msg.name
        if (lv_name.length == 0) {
            res.json({
                code: 411,
                message: "Length Required",
                msg: {}
            })
        } else {
            await Model.Level.create({ lv_name })
            console.log(req.connection.remoteAddress.split(':')[3] + ' levels add')
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
        let schedule = await Model.Schedule.findByPk(req.params.id)
        if (schedule == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            console.log(req.connection.remoteAddress.split(':')[3] + ' schedules findById ' + req.params.id)
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    schedule
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