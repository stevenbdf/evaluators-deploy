const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Evaluator = require('../models/Evaluator')

var status_user

//Get evaluator list
router.get('/:status', async (req, res) => {
    status_user = req.query.status
    if (req.params.status === '0' || req.params.status === '1') {
        var evaluators = await Evaluator.findAll({
            where: {
                ev_status: req.params.status
            }
        });
    }
    if (evaluators[0] == undefined) {
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
                evaluators
            }
        })
    }
})

//FindById Evaluator
router.get('/findById/:id', async (req, res) => {
    try {
        let evaluator = await Evaluator.findByPk(req.params.id)
        if (evaluator == null) {
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
                    evaluators
                }
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

//Delete a Evaluator
router.delete('/delete', async (req, res) => {
    try {
        let obj = req.body.request.msg
        await Evaluator.destroy({
            where: {
                ev_id: obj.id
            }
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
            msg: {
                description: ""
            }
        })
    }
})

//Update Evaluator
router.put('/update/:id', async (req, res) => {
    try {
        let evaluator = await Evaluator.findAll({ where: { ev_id: req.params.id } })

        let obj = req.body.request.msg
        let row_update = await Evaluator.update(
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
        res.json({
            code: 201,
            message: "Success",
            msg: {
                description: "rows affected (" + row_update[0] + ")",
                new_row: row_update[1]
            }
        })
    } catch (err) {
        res.json({
            code: 400,
            message: " Bad Request",
            msg: {
                description: ''
            }
        })
    }
})

//UpdateStatus a Evaluator
router.put('/update-status/:id', async (req, res) => {
    try {
        let obj = req.body.request.msg
        let row_update = await Evaluator.update(
            { ev_status: obj.status },
            { returning: true, where: { ev_id: req.params.id } }
        )
        res.json({
            code: 201,
            message: "Success",
            msg: {
                description: "rows affected (" + row_update[0] + ")",
                new_row: row_update[1]
            }
        })
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
            ev_email: obj.email,
            ev_phone: obj.phone,
            ev_academic_level: obj.academic_level,
            ev_status: obj.status,
            sch_id: obj.sch_id,
        }

        let { ev_name, ev_email, ev_phone, ev_academic_level, ev_status, sch_id } = data

        await Evaluator.create({
            ev_name,
            ev_email,
            ev_phone,
            ev_academic_level,
            ev_status,
            sch_id,
        })
        res.json({
            code: 201,
            message: "Success",
            msg: {
                description: "Candidate successfully added"
            }
        })
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

module.exports = router