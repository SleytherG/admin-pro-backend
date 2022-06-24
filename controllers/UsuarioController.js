const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

  const desde = Number(req.query.desde) || 0;
  const size = Number(req.query.size) || 5;

//   const usuarios = await Usuario
//                                 .find({}, "nombre email role google")
//                                 .skip( desde )
//                                 .limit( size );

//   const total = await Usuario.count();
const [ usuarios, total ] = await Promise.all([
    Usuario
          .find({}, "nombre email role google img")
          .skip( desde )
          .limit( size ),
    Usuario.countDocuments()
]);


  res.json({
    ok: true,
    msg: "Lista de Usuarios",
    usuarios: usuarios,
    uid: req.uid,
    total: total
  });
};


const crearUsuario = async (req, res = response) => {

  const { email, password, nombre } = req.body;

    

  try {

    const existeEmail = await Usuario.findOne({ email: req.body.email });

    if ( !existeEmail ) {
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        /**Guardar Usuario */
        await usuario.save();

        // Generar el Token - JWT
        const token = await generarJWT( usuario.uid );
    
        res.json({
          ok: true,
          usuario: usuario,
          token: token
        });
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya se encuentra registrado,'
        })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar logs.",
    });
  }
};

const actualizarUsuario = async (req, res = response ) => {

    // TODO: Validar Token y comprobar si es el usuario correcto.

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg:  'No existe un usuario por ese id'
            });
        }

        // Actualización
        const { password, google, email, ...campos } = req.body;
        if ( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email: email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email.'
                })
            }
        }
        campos.email = email;


        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true} );


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const eliminarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado por el id'
            });
        }
        // Delete User
        const usuarioEliminado = await Usuario.findByIdAndDelete( uid );

        res.json({
           ok: true,
           msg: 'Usuario Eliminado Satisfactoriamente.'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
}


module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
