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

const actualizarMedico = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'Actualizar Medico'
    });
}

const eliminarMedico = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'Eliminar Medico'
    });
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}