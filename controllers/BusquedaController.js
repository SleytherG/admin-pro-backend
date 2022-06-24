const { response }  = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');


// Busqueda General
const busquedaGeneral = async ( req, res = response) => {

    const busqueda = req.params.busqueda || '';
    const regex = new RegExp( busqueda, 'i');

    // const usuarios   = await Usuario.find({ nombre: regex });
    // const hospitales = await Hospital.find({ nombre: regex });
    // const medicos    = await Medico.find({ nombre: regex });

    const [ usuarios, hospitales, medicos ] = await Promise.all([
        Usuario.find({ nombre: regex}),
        Hospital.find({ nombre: regex}),
        Medico.find({ nombre: regex}),
    ]);

    try {
       
        res.json({
            ok: true,
            msg: 'Busqueda',
            usuarios: usuarios,
            hospitales: hospitales,
            medicos: medicos
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const documentosCollection = async ( req, res = response) => {

    const tabla     = req.params.tabla;
    const busqueda  = req.params.busqueda || '';
    const regex     = new RegExp( busqueda, 'i');
    let resultado = [];

    switch( tabla ) {
        case 'medicos':
            resultado = await Medico
                                    .find({ nombre: regex})
                                    .populate('usuario','nombre img')
                                    .populate('hospital', 'nombre img');
            break;
        case 'hospitals':
            resultado = await Hospital
                                    .find({ nombre: regex})
                                    .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            resultado = await Usuario.find({ nombre: regex});
            break;    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios | medicos | hospitals'
            }); 
    }

    try {
       
        res.json({
            ok: true,
            msg: 'Busqueda',
            resultados: resultado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    busquedaGeneral,
    documentosCollection
};