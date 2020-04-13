var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RoleSchema = Schema({
    name: { type: String }
}, { timestamps: true });

module.exports  = mongoose.model('Role', RoleSchema);
