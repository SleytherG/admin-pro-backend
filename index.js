require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el Servidor de Express
const app = express();

/**
 * Middlewares
 */

//Configurar CORRS
app.use(cors());

/**
 * Carpeta Publica
 */
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Conexión a la Base de Datos
dbConnection();

/**
 * Rutas
 */
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busqueda'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));



app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en Puerto ' + process.env.PORT);
});
