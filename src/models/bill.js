const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
    date: {
        type: String
    },
    previousReading: {
        type: Number
    },
    currentReading: {
        type: Number
    },
    consumption: {
        type: Number
    },
    cost: {
        type: Number
    },
    meterNumber: {
        type: Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

const Bill = mongoose.model('Bill', billSchema)


module.exports = Bill;