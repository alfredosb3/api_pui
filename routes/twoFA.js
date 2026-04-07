/* Ruta: /api/login */

const { Router } = require("express");
const { test, login } = require("../controllers/login");

const router = Router();

const methodNotAllowed = (req, res) => {
    return res.status(405).json({
        ok: false,
        message: 'Método no permitido'
    });
};

router.get('/', [], test);
router.all('/', methodNotAllowed);

router.post('/login', [], login);
router.all('/login', methodNotAllowed);
 

module.exports = router;