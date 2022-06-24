/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/UsuarioController');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Obtener Usuarios
router.get( '/', validarJWT , getUsuarios );

// Crear Usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('password', 'La contraseña es obligatoria.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        validarCampos
    ],
    crearUsuario
);

// Actualizar Usuarios
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'La email es obligatorio.').not().isEmpty(),
        check('role', 'El role es obligatorio.').not().isEmpty(),
        validarCampos
    ], 
    actualizarUsuario 
);

// Eliminar Usuarios
router.delete('/:id',validarJWT, eliminarUsuario );



module.exports = router;