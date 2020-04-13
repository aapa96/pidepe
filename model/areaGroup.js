var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AreaGroupSchema = Schema({
    name: { type: String },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    parentAreaGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AreaGroup',
        require: false
    }
}, { timestamps: true });

module.exports  = mongoose.model('AreaGroup', AreaGroupSchema);