/**
 * Ruta: '/api/todo'
 */

 const { Router } = require('express');
 const { busquedaGeneral, documentosCollection } = require('../controllers/BusquedaController')
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router = Router();
 
 // Busqueda General
 router.get( '/:busqueda', validarJWT,  busquedaGeneral );
 router.get( '/coleccion/:tabla/:busqueda', validarJWT, documentosCollection );
 
 
 
 module.exports = router;