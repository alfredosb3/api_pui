const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarJWT = ( payload ) => {


   return new Promise ((resolve, reject) => {
      const datos = {
         payload
      };
      jwt.sign( datos, process.env.JWT_SECRET, {
         expiresIn: '1h' // 9000 9seg
      }, (err, token) =>{
         if(err){
            reject('Error al generar token');
         }else{ 
            resolve( token );
         }
         
      } )
   } );
}

module.exports = {
   generarJWT
}