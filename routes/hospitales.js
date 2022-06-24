/**
 * Ruta: '/api/hospitales'
 */

 const { Router } = require('express');
 const { check } = require('express-validator');
const { crearHospital, getHospitales, actualizarHospital, eliminarHospital } = require('../controllers/HospitalController');
 const { validarCampos } = require('../middlewares/validar-campos');

 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router = Router();
 
 // Obtener Hospitales
 router.get( '/', validarJWT, getHospitales );
 
 // Crear Hospitales
 router.post('/',
     [
        validarJWT,
        check('nombre', 'El nombre del Hospital es necesario.').not().isEmpty(),
        validarCampos
     ],
     crearHospital
 );
 
 // Actualizar Hospitales
 router.put('/:id',
     [
        validarJWT
     ], 
     actualizarHospital 
 );
 
 // Eliminar Hospitales
 router.delete('/:id', validarJWT,eliminarHospital );
 
 
 
 module.exports = router;