/* Ruta: /api/activar-reporte */

const { Router } = require("express");
const { activarReporte, activarReportePrueba, desactivarReporte } = require("../controllers/reportes");

const router = Router();
const cors = require('cors');
const { validarJWT } = require("../middlewares/validar-jwt");


const methodNotAllowed = (req, res) => {
    return res.status(405).json({
        ok: false,
        message: 'Método no permitido'
    });
};

router.post('/activar-reporte', [validarJWT], activarReporte);
router.all('/activar-reporte', methodNotAllowed);

router.post('/activar-reporte-prueba', [validarJWT], activarReportePrueba);  
router.all('/activar-reporte-prueba', methodNotAllowed);

router.post('/desactivar-reporte', [validarJWT], desactivarReporte);
router.all('/desactivar-reporte', methodNotAllowed);  

// Manejador de rutas no válidas (ej. 404 Not Found)
router.all('*', (req, res) => {
    return res.status(404).json({
        ok: false,
        message: 'ruta no valida Rep'
    });
});

module.exports = router;