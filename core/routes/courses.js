const express = require('express')
const router = express.Router()
const Model = require('../models/model')


//Get courses list
router.get('/', async (req, res) => {
    try {
        let courses = await Model.Course.findAll({
            attributes:['cou_id','cou_name','cou_teacher_guide'],
            include:[
                { model: Model.Local, as: 'local' },
                { model: Model.Level, as: 'level' }
            ]
        })
        if (courses[0] == undefined) {
            res.json({
                status: 204,
                message: "No Content",
                msg: {
                }
            })
        } else {
            courses.forEach((item) => {
                item.handle = ''
            })
            console.log(req.connection.remoteAddress.split(':')[3] + ' courses findAll')
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

//Update course
router.post('/update/:id', async (req, res) => {
    try {
        let course = await Model.Course.findByPk(req.params.id)
        if (course != null) {
            let obj = req.body.request.msg
            await Model.Course.update(
                {
                    cou_name: (obj.name === '') ? course.cou_name : obj.name,
                    cou_teacher_guide: (obj.name === '') ? course.cou_teacher_guide : obj.teacher_guide,
                    lv_id: (obj.name === '') ? course.lv_id : obj.lv_id,
                    lc_id: (obj.name === '') ? course.lc_id : obj.lc_id
                }, {    
                    where:
                        {
                            cou_id: req.params.id
                        }
                }
            )
            console.log(req.connection.remoteAddress.split(':')[3] + ' courses update by id ' + req.params.id)
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

//Delete course
router.post('/delete', async (req, res) => {
    try {
        let obj = req.body.request.msg
        let cou = await Model.Course.findByPk(obj.id)
        if (cou == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            await Model.Course.destroy({
                where: {
                    cou_id: obj.id
                }
            })
            console.log(req.connection.remoteAddress.split(':')[3] + ' course delete ' + obj.id)
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

//Add course
router.post('/add', async (req, res) => {
    try {
        let obj = req.body.request.msg
        if (obj.name.length == 0 || obj.teacher_guide.length == 0 || obj.lv_id.length == 0 || obj.lc_id.length == 0) {
            res.json({
                code: 411,
                message: "Length Required",
                msg: {}
            })
        } else {

            const data = {
                cou_name: obj.name,
                cou_teacher_guide: obj.teacher_guide,
                lv_id: obj.lv_id,
                lc_id: obj.lc_id,
            }

            let { cou_name, cou_teacher_guide, lv_id, lc_id } = data
            await Model.Course.create({
                cou_name,
                cou_teacher_guide,
                lv_id, 
                lc_id
            })
            console.log(req.connection.remoteAddress.split(':')[3] + ' course add')
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
        let course = await Model.Course.findByPk(req.params.id,{
            attributes:['cou_id','cou_name','cou_teacher_guide','lc_id','lv_id','handle']
        })
        if (course == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            console.log(req.connection.remoteAddress.split(':')[3] + ' course findById ' + req.params.id)
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    course
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