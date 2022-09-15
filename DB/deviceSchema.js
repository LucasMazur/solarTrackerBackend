const mongoose = require('mongoose')

const measureData = new mongoose.Schema({
    measureVolt: { type: String, required: true},
    measureAmper: { type: String, required: true }
});

module.exports = MeasureData = mongoose.model('measureDataTB', measureData)