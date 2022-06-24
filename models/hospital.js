const mongoose = require('mongoose');

const HospitalSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Usuario'
    }
});

HospitalSchema.method('toJSON', function() {
    const { _v, ...object } = this.toObject();
    return object;
    
}, { collection: 'hospitales'} );

module.exports = mongoose.model('Hospital', HospitalSchema);