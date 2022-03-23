const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    "1": { name: String, items: [Object] },
    "2": {name: String, items: [Object] },
    "3": {name: String, items: [Object] }
})

module.exports = model('Colmun', schema);