const mysql = require('mysql2/promise');
const conf = require('./confing');

const config = {
    host: conf.dbPUI.host,
    user: conf.dbPUI.user,
    password: conf.dbPUI.password,
    database: conf.dbPUI.database,
    waitForConnections: true,
    connectionLimit: conf.dbPUI.connectionLimit || 10,
    queueLimit: 0
};

const pool = mysql.createPool(config);

async function query(sql, params) {
    const [results,] = await pool.execute(sql, params);
    return results;
}

module.exports = {
    query,
    pool
};
