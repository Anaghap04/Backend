const mongoose = require('mongoose');
const Schema = mongoose.Schema({                                               
    description: { type: String, required: true},
    status: { type: String, required: true }
});

const documentData = mongoose.model('todoapp',Schema);
module.exports = documentData;
