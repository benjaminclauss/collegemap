const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    name: String,
    colleges: [{ type: Schema.Types.ObjectId, ref: 'College' }],
});

module.exports = mongoose.model('Map', MapSchema);
