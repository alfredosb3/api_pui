const { response } = require("express");

const dbMysqlPUI = require('../database/mysql_pui');

 
const isValidoPayload = (body) => {
   const invalidChars = /[%<>'\"\/]/;
   for (const key in body) {
      if (typeof body[key] === 'string' && invalidChars.test(body[key])) {
         return false;
      }
   }
   return true;
};

const activarReporte = async (req, res = response) => {
   try {
      if (!isValidoPayload(req.body)) {
         return res.status(400).json({ ok: false, message: 'La solicitud contiene datos inválidos o con formato incorrecto' });
      }

      const { id, curp } = req.body;

      if (!id || !curp) {
         return res.status(400).json({
            ok: false,
            message: 'La solicitud contiene datos inválidos o con formato incorrecto'
         });
      }

      const sqlInsert = `
         INSERT INTO busquedas 
         (id, curp, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, fecha_desaparicion, lugar_nacimiento, sexo_asignado, telefono, correo, direccion, calle, numero, colonia, codigo_postal, municipio_o_alcaldia, entidad_federativa, estado_busqueda)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVA')
      `;

      const values = [
         req.body.id,
         req.body.curp,
         req.body.nombre || null,
         req.body.primer_apellido || null,
         req.body.segundo_apellido || null,
         req.body.fecha_nacimiento || null,
         req.body.fecha_desaparicion || null,
         req.body.lugar_nacimiento || 'DESCONOCIDO',
         req.body.sexo_asignado || null,
         req.body.telefono || null,
         req.body.correo || null,
         req.body.direccion || null,
         req.body.calle || null,
         req.body.numero || null,
         req.body.colonia || null,
         req.body.codigo_postal || null,
         req.body.municipio_o_alcaldia || null,
         req.body.entidad_federativa || null
      ];

      await dbMysqlPUI.query(sqlInsert, values);

      return res.status(200).json({
         message: 'La solicitud de activación del reporte de búsqueda se recibió correctamente.'
      });

   } catch (error) {
      // console.error(error);
      return res.status(500).json({
         ok: false,
         message: 'Ocurrió un error interno al procesar la solicitud.'
      });
   }
}

const activarReportePrueba = async (req, res = response) => {
   try {
      if (!isValidoPayload(req.body)) {
         return res.status(400).json({ ok: false, message: 'La solicitud contiene datos inválidos o con formato incorrecto' });
      }

      const { id, curp } = req.body;

      if (!id || !curp) {
         return res.status(400).json({
            ok: false,
            message: 'La solicitud contiene datos inválidos o con formato incorrecto'
         });
      }

      console.log('activarReportePrueba');
      return res.status(200).json({
         ok: true,
         message: 'La petición de prueba se recibió correctamente'
      });

   } catch (error) {
      // console.error(error);
      return res.status(500).json({
         ok: false,
         message: 'Ocurrió un error interno al procesar la prueba del Webhook'
      });
   }
}

const desactivarReporte = async (req, res = response) => {
   try {
      if (!isValidoPayload(req.body)) {
         return res.status(400).json({ ok: false, message: 'La solicitud contiene datos inválidos o con formato incorrecto' });
      }

      const { id } = req.body;

      if (!id) {
         return res.status(400).json({
            ok: false,
            message: 'La solicitud contiene datos inválidos o con formato incorrecto'
         });
      }

      const sqlUpdate = `UPDATE busquedas SET estado_busqueda='INACTIVA' WHERE id = ?`;
      await dbMysqlPUI.query(sqlUpdate, [id]);

      return res.status(200).json({
         message: 'Registro de finalización de búsqueda histórica guardado correctamente'
      });

   } catch (error) {
      // console.error(error);
      return res.status(500).json({
         ok: false,
         message: 'Ocurrió un error interno al procesar la solicitud'
      });
   }
}

module.exports = {
   activarReporte,
   activarReportePrueba,
   desactivarReporte
}