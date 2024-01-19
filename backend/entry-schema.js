const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    day: String,
    workout_sts: String
});
module.exports = mongoose.model('RecordEntry', entrySchema); 