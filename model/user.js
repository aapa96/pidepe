var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    userPersonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserPerson',
        require: false
    },
}, { timestamps: true });

module.exports  = mongoose.model('User', UserSchema);
