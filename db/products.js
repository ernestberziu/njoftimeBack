const mongoose = require('mongoose');
const Schema = require('./schema');

const dataSchema = Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
})

module.exports = mongoose.model('Product', dataSchema)