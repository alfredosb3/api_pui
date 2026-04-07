const jwt = require('jsonwebtoken');
 

const validarJWT = (req, resp, next) => {
   // Obtiene el esquema ('Bearer') y el token
   const [type, token] = req.headers['authorization']?.split(' ') ?? [];
   // Valida que exista el token Y que el esquema sea obligatoriamente Bearer
   if (!token || type !== 'Bearer') {
      return resp.status(401).json({
         IsSuccessful: false,
         msg: 'Credenciales no válidas o acceso denegado'
      });
   }
   try {
      // jwt.verify valida la firma, vigencia (expiración) y malformaciones.
      // Retorna el token entero de ser válido
      const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
      
      // Opcional: inyectas la data a la request por si algún endpoint la necesita.
      req.userAuth = decodedInfo; 
      
      next();
   } catch (error) {
      // Atrapa error de firmas falsas, expiración o token destructurado
      return resp.status(401).json({
         IsSuccessful: false,
         msg: 'Credenciales no válidas o acceso denegado'
      });
   }
} 

module.exports = {
   validarJWT, 
}