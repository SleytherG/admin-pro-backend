require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el Servidor de Express
const app = express();
// fXhTKRhb5pKM36k5
// mean_user
dbConnection();

/**
 * Middlewares
*/

//Configurar CORRS
app.use(cors());


/**
 * Rutas
 */
app.get('/', (req,res) => {
    res.status(400).json({
       ok: true,
       msg: 'Hola Mundo'
    });
})

app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en Puerto ' + process.env.PORT);
});
