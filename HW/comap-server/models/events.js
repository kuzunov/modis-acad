const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{type: String, required: true},
    date:{type: String, required: true},
    poster:{type: String, required: true},
    description:{type: String, required: true},
}, {timestamps:true});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;