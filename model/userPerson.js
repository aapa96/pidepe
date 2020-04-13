var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserPersonSchema = Schema({
    name: { type: String },
    lastname: { type: String },
    phone: { type: String },
    email: { type: String }
}, { timestamps: true });

module.exports  = mongoose.model('UserPerson', UserPersonSchema);
