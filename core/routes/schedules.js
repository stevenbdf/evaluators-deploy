const express = require('express')
const router = express.Router()
const Model = require('../models/model')

//Get schedule list
router.get('/', async (req, res) => {
    try {
        let schedules = await Model.Schedule.findAll()
        if (schedules[0] == undefined) {
            res.json({
                status: 204,
                message: "No Content",
                msg: {
                }
            })
        } else {
            schedules.forEach((item) => {
                item.handle = ''
            })
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    schedules
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

//Update schedule


//Delete schedule
router.post('/delete', async (req, res) => {
    try {
        let obj = req.body.request.msg
        let sch = await Model.Schedule.findByPk(obj.id)
        if (sch == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            await Model.Schedule.destroy({
                where: {
                    sch_id: obj.id
                }
            })
            res.json({
                code: 205,
                message: "Reset Content",
                msg: {}
            })
        }
    } catch (err) {
        res.json({err})
        if (err.parent.code == '23503') {
            res.json({
                code: 400,
                message: " Bad Requested",
                msg: {
                    description: err
                }
            })
        } else {
            res.json({
                code: 400,
                message: " Bad Requested",
                msg: {
                    description: err
                }
            })
        }
    }
})

//Add schedule
router.post('/add', async (req, res) => {
    try {
        let sch_schedule = req.body.request.msg.schedule
        await Model.Schedule.create({ sch_schedule })
        res.json({
            code: 205,
            message: "Reset Content",
            msg: {}
        })
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