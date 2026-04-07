const { response } = require("express");

const dbMysqlPUI = require('../database/mysql_pui');

const { generarJWT } = require("../helpers/jwt");
require('dotenv').config();


const test = async (req = request, res = response) => {
   res.send({
      ok: true,
      msg: 'api Login GET OK!!'
   });
}
 
const login = async (req, res = response) => {
   try {
      const { usuario, clave } = req.body;

      if (!clave || typeof clave !== 'string') {
         return res.status(400).json({
            ok: false,
            message: 'El campo clave es obligatorio y debe ser de tipo String.'
         });
      }

      if (clave.length < 16 || clave.length > 20) {
         return res.status(400).json({
            ok: false,
            message: 'El campo clave deberá tener entre 16 y 20 caracteres.'
         });
      }

      const hasUpperCase = /[A-Z]/.test(clave);
      const hasNumber = /[0-9]/.test(clave);
      const hasSpecialChar = /[!@#\$%\^&\*\(\)\-_\.\+]/.test(clave);

      if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
         return res.status(400).json({
            ok: false,
            message: 'El campo clave debe incluir al menos una letra mayúscula, un número (0-9) y al menos uno de los caracteres especiales permitidos: ! @ # $ % ^ & * ( ) - _ . +'
         });
      }

      if (clave !== process.env.PUI_PASSWORD) {
         return res.status(400).json({
            ok: false,
            message: 'Credenciales inválidas'
         });
      }

      console.log({ tipo: 'Test', usuario, clave });

      const token = await generarJWT({
         usuario: usuario
      });
      // result[0].cveAgente = '';
      return res.status(200).json({
         token
      });


   } catch (error) {
      console.error(error);
      return res.status(500).json({
         IsSuccessful: false,
         Errors: ['Error interno del servidor']
      });
   }

}

module.exports = {
   test,
   login,
}

