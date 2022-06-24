/**
 * Ruta: '/api/login'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/AuthController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', 
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password','La contraseña es obligatoria.').not().isEmpty(),
        validarCampos
    ] 
    ,login
);






module.exports = router;