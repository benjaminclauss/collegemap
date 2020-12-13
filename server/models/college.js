var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollegeSchema = new Schema({
    name: String
});

module.exports = mongoose.model('College', CollegeSchema);