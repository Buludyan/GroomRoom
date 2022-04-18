const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    "1": { name: String, items: [Object] },
    "2": {name: String, items: [Object] },
    "3": {name: String, items: [Object] },
    "adminId": {type: String, required: true},
    "roomId": {type: String, required: true},
    "users": [Object],
    "votingData": [Object]
})

module.exports = model('Room', schema);