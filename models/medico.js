const mongoose = require('mongoose');

const MedicoSchema = mongoose.Schema({

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
    },
    hospital: {
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Hospital'
    }
});

MedicoSchema.method('toJSON', function() {
    const { _v, ...object } = this.toObject();
    return object;
});

module.exports = mongoose.model('Medico', MedicoSchema);