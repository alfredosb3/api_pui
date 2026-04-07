
require('dotenv').config();
 
const dbPUI = { 
    host: process.env.PUIDB_HOST,
    user: process.env.PUIDB_USER,
    password: process.env.PUIDB_PASSWORD,
    database: process.env.PUIDB_DATABASE,
    connectionLimit: process.env.connectionLimit || 10, 
    listPerPage: 10,
};

module.exports = {
  dbPUI
};
