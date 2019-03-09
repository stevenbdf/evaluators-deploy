const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Schedule = require('../models/Schedule')

//Get user list

//Add a user

//findById
router.get('/findById/:id', async (req, res) => {
    try {
        let schedule = await Schedule.findByPk(req.params.id)
        if (schedule == null) {
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