
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CountrySchema = Schema({
    name: { type: String },
    code: { type: String },
    currency: { type: String },
    location:{}
}, { timestamps: true });

module.exports = mongoose.model('Country', CountrySchema);