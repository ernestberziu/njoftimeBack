const mongoose = require('mongoose');

const Schema = (schema) => new mongoose.Schema({
    ...schema,
    deleted: {
        required: true,
        type: Boolean
    }
})

module.exports = Schema