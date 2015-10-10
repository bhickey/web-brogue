var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var gameRecordSchema = mongoose.Schema({
    username: String,
    date: { type: Date, default: Date.now },
    seed: Number,
    score: Number,
    level: Number,
    easyMode: Boolean,
    result: Number,
    description: String
});

gameRecordSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('GameRecord', gameRecordSchema);