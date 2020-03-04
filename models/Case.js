const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CaseSchema = new Schema({
    image: {type: String, required: true},
    comments: [{type: String}],
    toxicVotes: {type: Number, default: 0},
    nonToxicCotes: {type: Number, default: 0},
    extraCaseInfo: {type: String, required: true}
});
// this is for the filtering. allows to search for any text
CaseSchema.index({
    '$**': 'text'
});

module.exports = mongoose.model('Case', CaseSchema);