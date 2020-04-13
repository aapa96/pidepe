var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserCredentialSchema = Schema({
    email:{type:String},
    password:{type:String},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: false
    },
}, { timestamps: true });

module.exports  = mongoose.model('UserCredential', UserCredentialSchema);
