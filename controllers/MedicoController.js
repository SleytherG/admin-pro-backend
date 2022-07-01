const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async ( req, res = response ) => {

    try {

        const medicosDB = await Medico.find()
                                      .populate('usuario', 'nombre img')
                                      .populate('hospital','nombre');

        res.json({
            ok: true,
            medicos: medicosDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
}

const crearMedico = async ( req, res = response ) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })

    try {
        const medicoDB = await medico.save();


        res.json({
            ok: true,
            medico: medicoDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador.'
        })
    }


}

const actualizarMedico = async ( req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medicoDB = await Medico.findById(id);

        if ( !medicoDB ) {
            res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        const cambiosMedico = {
            ...req.body,
            hospital: req.body.hospital,
            usuario: uid
        };

        const medicoUpdated = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true});
        
        res.json({
            ok: true,
            msg: 'Medico actualizado exitosamente',
            medicoActualizado: medicoUpdated
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador.'
        })
    }


}

const eliminarMedico = async ( req, res = response ) => {

    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById(id);

        if ( !medicoDB ) {
            res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        const medicoDeleted = await Medico.findByIdAndDelete(id, {new: true});
        
        res.json({
            ok: true,
            msg: 'Medico eliminado exitosamente.',
            medicoEliminado: medicoDeleted
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador.'
        })
    }

}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}