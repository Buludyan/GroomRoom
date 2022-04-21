const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    //voteState: {isVoted: {type: Boolean, default: false}, value: {type: Boolean, default: 0}}
})

module.exports = model('User', schema);