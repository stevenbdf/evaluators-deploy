const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Evaluator = require('../models/Evaluator')

var status_user

//Get evaluator list
router.get('/', async (req, res) => {
    status_user = req.query.status
    if(req.query.status === '0' || req.query.status === '1'){
        var evaluators = await Evaluator.findAll({
            where:{
                ev_status: req.query.status
            }        
        });
    }
    res.json({
        status: 200,
        message: "Ok",
        msg:{
            evaluators
        }
    })
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
            ev_horary: obj.horary,
            ev_status: obj.status,
        }

        let { ev_name, ev_email, ev_phone, ev_academic_level, ev_horary, ev_status } = data

        await Evaluator.create({
            ev_name, 
            ev_email, 
            ev_phone, 
            ev_academic_level, 
            ev_horary, 
            ev_status
        })
        res.json({
            code: 201,
            message: "Success",
            msg:{
                description:"Candidate successfully added"
            }
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

module.exports = router