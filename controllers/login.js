const { response } = require("express");

const { generarJWT } = require("../helpers/jwt");
const { registrarLog, getReqData } = require("../helpers/logger");
require('dotenv').config();


const test = async (req = request, res = response) => {
   res.send({
      ok: true,
      msg: 'api Login GET OK!!'
   });
}
 
const login = async (req, res = response) => {
   const reqData = getReqData(req);
   try {
      const { usuario, clave } = req.body;

      if (!clave || typeof clave !== 'string') {
         registrarLog({ ...reqData, evento: 'LOGIN_ASECAM_FALLIDO', descripcion: 'La clave no fue proporcionada o es inválida', usuario, estado_http: 400 });
         return res.status(400).json({
            ok: false,
            message: 'El campo clave es obligatorio y debe ser de tipo String.'
         });
      }

      if (clave.length < 16 || clave.length > 20) {
         registrarLog({ ...reqData, evento: 'LOGIN_ASECAM_FALLIDO', descripcion: 'Longitud de clave incorrecta', usuario, estado_http: 400 });
         return res.status(400).json({
            ok: false,
            message: 'El campo clave deberá tener entre 16 y 20 caracteres.'
         });
      }

      const hasUpperCase = /[A-Z]/.test(clave);
      const hasNumber = /[0-9]/.test(clave);
      const hasSpecialChar = /[!@#\$%\^&\*\(\)\-_\.\+]/.test(clave);

      if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
         registrarLog({ ...reqData, evento: 'LOGIN_ASECAM_FALLIDO', descripcion: 'Formato de clave inválido', usuario, estado_http: 400 });
         return res.status(400).json({
            ok: false,
            message: 'El campo clave debe incluir al menos una letra mayúscula, un número (0-9) y al menos uno de los caracteres especiales permitidos: ! @ # $ % ^ & * ( ) - _ . +'
         });
      }

      if (clave !== process.env.PUI_PASSWORD) {
         registrarLog({ ...reqData, evento: 'LOGIN_ASECAM_FALLIDO', descripcion: 'Credenciales inválidas', usuario, estado_http: 400 });
         return res.status(400).json({
            ok: false,
            message: 'Credenciales inválidas'
         });
      }

      console.log({ tipo: 'Asecam', usuario, clave });

      const token = await generarJWT({
         usuario: usuario
      });
      // result[0].cveAgente = '';
      
      registrarLog({ ...reqData, evento: 'LOGIN_ASECAM_EXITOSO', descripcion: 'Autenticación correcta', usuario, estado_http: 200 });
      return res.status(200).json({
         token
      });


   } catch (error) {
      console.error(error);
      registrarLog({ ...reqData, evento: 'ERROR_SISTEMA', descripcion: error.message || 'Error interno del servidor', usuario: req.body?.usuario || '', estado_http: 500 });
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

