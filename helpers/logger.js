const dbMysqlPUI = require('../database/mysql_pui');

const registrarLog = async (params) => {
    try {
        const { evento, descripcion, usuario, ip_origen, metodo, ruta, user_agent, estado_http } = params;
        const sql = `INSERT INTO logs (evento, descripcion, usuario, ip_origen, metodo, ruta, user_agent, estado_http) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        await dbMysqlPUI.query(sql, [
            evento, 
            descripcion || null, 
            usuario || null, 
            ip_origen || null, 
            metodo || null, 
            ruta || null, 
            user_agent || null, 
            estado_http || null
        ]);
    } catch (error) {
        console.error('Error al registrar log en la BD:', error);
    }
};

const getReqData = (req) => {
    return {
        ip_origen: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.ip || '',
        metodo: req.method,
        ruta: req.originalUrl,
        user_agent: req.headers['user-agent'] || ''
    };
};

module.exports = {
    registrarLog,
    getReqData
};
