var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AreaSchema = Schema({
    name: { type: String },
    areaGroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AreaGroup'
    },
    parentArea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area',
        require: false
    },
    location:{}
}, { timestamps: true });

module.exports  = mongoose.model('Area', AreaSchema);
