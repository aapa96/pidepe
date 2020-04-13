var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserStaffSchema = Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: false
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        require: false
    },
}, { timestamps: true });

module.exports  = mongoose.model('UserStaff', UserStaffSchema);
