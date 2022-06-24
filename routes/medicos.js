/**
 * Ruta: '/api/medicos'
 */

 const { Router } = require('express');
 const { check } = require('express-validator');
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/MedicoController');
 const { validarCampos } = require('../middlewares/validar-campos');

 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router = Router();
 
 // Obtener Medicos
 router.get( '/',  getMedicos );
 
 // Crear Medicos
 router.post('/',
     [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio.').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
     ],
     crearMedico
 );
 
 // Actualizar Medicos
 router.put('/:id',
     [
     ], 
     actualizarMedico 
 );
 
 // Eliminar Medicos
 router.delete('/:id', eliminarMedico );
 
 
 
 module.exports = router;