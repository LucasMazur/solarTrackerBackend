const { response } = require('express')
const express = require('express')
const { Mongoose } = require('mongoose')
const MeasureData = require('../DB/deviceSchema')
const route = express.Router()

route.post('/save', async(req, res) => {
    const { measureVolt, measureAmper } = req.body
    let measureData = {};
    measureData.measureVolt = measureVolt
    measureData.measureAmper = measureAmper
    console.log(req.body)

    let newMeasure = new MeasureData(measureData)

    await newMeasure.save((err) => {
        if (!err) console.log("Save measure data Succeful!!") 
        else {
            res.send(err)
            console.log(err)
        }
    })
    res.json(newMeasure)
})

route.get('/get', async (req, res) => {    
    await MeasureData.find({}, (err, doc) => {
        if (!err) {
            res.json(doc + "data sent")
        } else {
            res.send("Data Base err")
        }        
    })
})

route.post('/remove', async (req, res) => {
    console.log(req.body.del)  
    await MeasureData.findById(req.body.del, async (err, doc) => {
        console.log(doc)
        if (!err) {
            await doc.remove()
            res.json(doc)
        } else {
            res.send("Data Base Err")
        }
    })
})

route.post('/update', async (req, res) => {
    const { measureVolt, measureAmper, id } = req.body
    let measureData = {}
    measureData.id = id
    measureData.measureVolt = measureVolt
    measureData.measureAmper = measureAmper
    
    console.log(req.body)
    await MeasureData.findById(measureData.id, async (err, doc) => {
        if (measureVolt === "0") {
            measureData.measureVolt = doc.measureVolt
        }
        if (measureAmper === "0") {
            measureData.measureAmper = doc.measureAmper
        }

        await MeasureData.findByIdAndUpdate(measureData.id, {"measureVolt":measureData.measureVolt, "measureAmper":measureData.measureAmper}, async (err, doc) => {
            if (!err) {
                console.log("Update Succeful!!")
                res.json(doc)
            } else {
                res.send("Data Base Err")
            }
        })
    })
})

module.exports = route