const express = require('express')
const router = express.Router()
const Model = require('../models/model')

//findAll binnacles
router.get('/', async (req, res) => {
    try {
        var binnacles = await Model.Binnacle.findAll({
            attributes: ['bin_id', 'bin_return_code', 'bin_message', 'bin_datetime'],
            include: [
                { model: Model.User, as: 'user' }
            ]
        })
        console.log(req.connection.remoteAddress.split(':')[3] + ' binnacles findAll')

        if (binnacles[0] == undefined) {
            res.json({
                status: 204,
                message: "No Content",
                msg: {
                }
            })
        } else {
            binnacles.forEach((item) => {
                item.handle = ''
            })
            res.json({
                status: 200,
                message: "Ok",
                msg: {
                    binnacles
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

//add binnacle
router.post('/add', async (req, res) => {
    try {
        let obj = req.body.request.msg
        const data = {
            bin_return_code: obj.return_code,
            bin_message: obj.message,
            bin_datetime: obj.datetime,
            us_id: obj.us_id,
        }
        let { bin_return_code, bin_message, bin_datetime, us_id, } = data
        let row = await Model.Binnacle.create({
            bin_return_code,
            bin_message, 
            bin_datetime,
            us_id,
        })
        res.json({
            code: 205,
            message: "Reset Content",
            msg: row
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

//delete binnacle
router.post('/delete', async (req, res) => {
    try {
        let obj = req.body.request.msg
        let ev = await Model.Binnacle.findByPk(obj.id)
        if (ev == null) {
            res.json({
                status: 404,
                message: "Not found",
                msg: {
                }
            })
        } else {
            await Model.Binnacle.destroy({
                where: {
                    bin_id: obj.id
                }
            })
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


//update binnacle
router.post('/update/:id', async (req, res) => {
    try {
        let binnacle = await Model.Binnacle.findByPk(req.params.id)
        if (binnacle != null) {
            let obj = req.body.request.msg
            await Model.Binnacle.update(
                {
                    bin_return_code: (obj.return_code === '') ? binnacle.bin_return_code : obj.return_code,
                    bin_message: (obj.message === '') ? binnacle.bin_message : obj.message,
                    bin_datetime: (obj.datetime === '') ? binnacle.bin_datetime : obj.datetime,
                    us_id: (obj.us_id === '') ? binnacle.us_id : obj.us_id,
                }, {
                    returning: true,
                    where:
                        {
                            bin_id: req.params.id
                        }
                }
            )
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