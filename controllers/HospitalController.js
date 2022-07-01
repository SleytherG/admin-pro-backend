const { response } = require('express');
const Hospital = require('../models/hospital');


const getHospitales = async (req, res = response ) => {

    
    try {
        const hospitalesDB = await Hospital.find()
                                           .populate('usuario', 'nombre img');


        res.json({
            ok: true,
            hospitales: hospitalesDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }

}

const crearHospital = async ( req, res = response ) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
}

const actualizarHospital = async ( req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;


    try {
        
        const hospitalDB = await Hospital.findById(id);

        if ( !hospitalDB ) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new : true });

        res.json({
            ok: true,
            msg: 'Hospital Actualizado exitosamente!',
            hospital: hospitalUpdated
        });
        


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
    
}

const eliminarHospital = async ( req, res = response ) => {

    const id = req.params.id;
    
    try {
        const existsId = await Hospital.findById(id);
    
        if ( !existsId ) {
            res.status(404).json({
                ok: false,
                msg: "Hospital no encontrado por el id"
            });
        }

        const hospitalDeleted = await Hospital.findByIdAndDelete(id, { new: true});

        res.json({
            ok: true,
            hospitalDeleted: hospitalDeleted
        });

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}