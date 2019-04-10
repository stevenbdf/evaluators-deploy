const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Model = require('../models/model')
const Op = Sequelize.Op

var status_user

//Get evaluator list by sttus
router.get('/status/:status', async (req, res) => {
    status_user = req.query.status
    if (req.params.status === '0' || req.params.status === '1') {
        var evaluators = await Model.Evaluator.findAll({
            attributes: ['ev_id', 'ev_name', 'ev_email', 'ev_phone', 'ev_academic_level'],
            where: {
                ev_status: req.params.status
            },
            include: [
                { model: Model.Schedule, as: 'schedules' }
            ]
        })
        console.log(req.connection.remoteAddress.split(':')[3]+' evaluators findAll by status '+req.params.status)
        if (evaluators[0] == undefined) {
            res.json({
                status: 204,
                message: "No Content",
                msg: {
                }
            })
        } else {
            evaluators.forEach((item) => {
                item.handle = ''
            })
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    evaluators
                }
            })
        }
    } else if (req.params.status === '-1') {
        var evaluators = await Model.Evaluator.findAll({
            attributes: ['ev_id', 'ev_name', 'ev_email', 'ev_phone', 'ev_academic_level', 'ev_status'],
            include: [
                { model: Model.Schedule, as: 'schedules' }
            ]
        })
        if (evaluators[0] == undefined) {
            res.json({
                status: 204,
                message: "No Content",
                msg: {
                }
            })
        } else {
            evaluators.forEach((item) => {
                item.handle = ''
            })
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    evaluators
                }
            })
        }
    } else {
        res.json({
            code: 404,
            message: " Not found",
            msg: {
                description: ""
            }
        })
    }

})

//Get evaluator different 0
router.get('/find', async (req, res) => {
    try {
        let evaluator = await Model.Evaluator.findAll({
            attributes: ['ev_id', 'ev_name', 'ev_email', 'ev_phone', 'ev_academic_level', 'ev_status'],
            include: [
                { model: Model.Schedule, as: 'schedules' }
            ],
            where:{
                ev_status:
                {
                    [Op.ne]:0
                },
            }
        })
        console.log(req.connection.remoteAddress.split(':')[3]+' evaluators findById '+req.params.id)
        if (evaluator == null) {
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
                    evaluator
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

//Get evaluator by shedule
router.post('/findBySchedule', async (req, res) => {
    try {
        let obj = req.body.request.msg
        let evaluator = await Model.Evaluator.findAll({
            attributes: ['ev_id', 'ev_name', 'ev_email', 'ev_phone', 'ev_academic_level', 'ev_status'],
            include: [
                { model: Model.Schedule, as: 'schedules' }
            ],
            where:{
                sch_id:obj.id,
                ev_status:
                {
                    [Op.ne]:0
                },
            }
        })
        console.log(req.connection.remoteAddress.split(':')[3]+' evaluators findBySchedule '+req.params.id)
        if (evaluator == null) {
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
                    evaluator
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

//FindById Evaluator
router.get('/findById/:id', async (req, res) => {
    try {
        let evaluator = await Model.Evaluator.findByPk(req.params.id, {
            attributes: ['ev_id', 'ev_name', 'ev_email', 'ev_phone', 'ev_academic_level', 'ev_status'],
            include: [
                { model: Model.Schedule, as: 'schedules' }
            ]
        })
        console.log(req.connection.remoteAddress.split(':')[3]+' evaluators findById '+req.params.id)
        if (evaluator == null) {
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
                    evaluator
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

//Delete a Evaluator
router.post('/delete', async (req, res) => {
    try {
        let obj = req.body.request.msg
        let ev = await Model.Evaluator.findByPk(obj.id)
        if (ev == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            await Model.Evaluator.destroy({
                where: {
                    ev_id: obj.id
                }
            })
            console.log(req.connection.remoteAddress.split(':')[3]+' evaluators delete '+obj.id)
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

//Update Evaluator
router.post('/update/:id', async (req, res) => {
    try {
        let evaluator = await Model.Evaluator.findByPk(req.params.id)
        if (evaluator != null) {
            let obj = req.body.request.msg
            await Model.Evaluator.update(
                {
                    ev_name: (obj.name === '') ? evaluator.ev_name : obj.name,
                    ev_email: (obj.email === '') ? evaluator.ev_email : obj.email,
                    ev_phone: (obj.phone === '') ? evaluator.ev_phone : obj.phone,
                    ev_academic_level: (obj.academic_level === '') ? evaluator.ev_academic_level : obj.academic_level,
                    ev_status: (obj.status === '') ? evaluator.ev_status : obj.status,
                    sch_id: (obj.sch_id === '') ? evaluator.sch_id : obj.sch_id
                }, {
                    returning: true,
                    where:
                        {
                            ev_id: req.params.id
                        }
                }
            )
            console.log(req.connection.remoteAddress.split(':')[3]+' evaluators update '+req.params.id)
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

//UpdateStatus a Evaluator
router.post('/update-status/:id', async (req, res) => {
    try {
        let obj = req.body.request.msg
        let evaluator = await Model.Evaluator.findByPk(req.params.id)
        if (evaluator != null) {
            await Model.Evaluator.update(
                { ev_status: obj.status },
                { where: { ev_id: req.params.id } }
            )
            console.log(req.connection.remoteAddress.split(':')[3]+' evaluators update-status '+req.params.id)
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
                description: ""
            }
        })
    }
})

//Add a Evaluator
router.post('/add', async (req, res) => {
    try {
        let obj = req.body.request.msg

        const data = {
            ev_name: obj.name,
            ev_email: obj.email.toLowerCase(),
            ev_phone: obj.phone,
            ev_academic_level: obj.academic_level,
            ev_status: obj.status,
            sch_id: obj.sch_id,
        }

        let { ev_name, ev_email, ev_phone, ev_academic_level, ev_status, sch_id } = data

        if (ev_name.trim().length == 0 || ev_email.trim().length == 0 || ev_phone.trim().length == 0 || ev_academic_level.trim().length == 0 ||
            ev_status.trim().length == 0 || sch_id.trim().length == 0) {
                res.json({
                    code: 411,
                    message: "Length Required",
                    msg: {}
                })
                
        } else {
            
            let row = await Model.Evaluator.create({
                ev_name,
                ev_email,
                ev_phone,
                ev_academic_level,
                ev_status,
                sch_id,
            })
            console.log(req.connection.remoteAddress.split(':')[3]+' evaluators create '+row.id)
            res.json({
                code: 205,
                message: "Reset Content",
                msg: row
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