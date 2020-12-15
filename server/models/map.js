const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    name: String,
    attendees: [{
        name: String,
        college: { type: Schema.Types.ObjectId, ref: 'College' },
    }],
});

module.exports = mongoose.model('Map', MapSchema);
