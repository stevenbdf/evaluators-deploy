const express = require('express')
const router = express.Router()
const Model = require('../models/model')


//Get assignments list
router.get('/', async (req, res) => {
    try {
        let courses = await Model.Assignment.findAll({
            attributes:['asg_id','cou_id','ev_id','handle']
        })
        if (courses[0] == undefined) {
            res.json({
                status: 204,
                message: "No Content",
                msg: {
                }
            })
        } else {
            console.log(req.connection.remoteAddress.split(':')[3] + ' assignment findAll')
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    courses
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

//Update assignment
router.post('/update/:id', async (req, res) => {
    try {
        let assignment = await Model.Assignment.findByPk(req.params.id)
        if (assignment != null) {
            let obj = req.body.request.msg
            await Model.Assignment.update(
                {
                    cou_id: (obj.cou_id === '') ? assignment.cou_id : obj.cou_id,
                    ev_id: (obj.ev_id === '') ? assignment.ev_id : obj.ev_id
                }, {    
                    where:
                        {
                            asg_id: req.params.id
                        }
                }
            )
            console.log(req.connection.remoteAddress.split(':')[3] + ' assignment update by id ' + req.params.id)
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

//Delete assignment
router.post('/delete', async (req, res) => {
    try {
        let obj = req.body.request.msg
        let assig = await Model.Assignment.findByPk(obj.id)
        if (assig == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            await Model.Assignment.destroy({
                where: {
                    asg_id: obj.id
                }
            })
            console.log(req.connection.remoteAddress.split(':')[3] + ' assignment delete ' + obj.id)
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

//Add assignment
router.post('/add', async (req, res) => {
    try {
        let obj = req.body.request.msg
        if (obj.cou_id.length == 0 || obj.ev_id.length == 0) {
            res.json({
                code: 411,
                message: "Length Required",
                msg: {}
            })
        } else {

            const data = {
                cou_id: obj.cou_id,
                ev_id: obj.ev_id,
            }

            let { cou_id, ev_id } = data
            await Model.Assignment.create({
                cou_id, 
                ev_id
            })
            console.log(req.connection.remoteAddress.split(':')[3] + ' assignment add')
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
        let assignment = await Model.Assignment.findByPk(req.params.id,{
            attributes:['asg_id','cou_id','ev_id','handle']
        })
        if (assignment == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            console.log(req.connection.remoteAddress.split(':')[3] + ' assignment findById ' + req.params.id)
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    assignment
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