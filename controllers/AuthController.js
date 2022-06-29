const { response }  = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async ( req, res = response) => {

    const { email, password } = req.body;

    try {

        
        // Verificar Email
        const usuarioDB = await Usuario.findOne({ email });
        
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email incorrecto'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // TODO: Generar un token - JWT
        const token = await generarJWT( usuarioDB.id );



        res.json({
            ok: true,
            token: token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async ( req, res = response) => {

    try {
        const { email, name, picture} = await googleVerify( req.body.token );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@';
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );

        // Guardar Usuario
        await usuario.save();

        res.json({
            ok: true,
            email: email,
            name: name,
            picture: picture,
            token: token
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto.'
        })
    }


    
}


module.exports = {
    login,
    googleSignIn
};