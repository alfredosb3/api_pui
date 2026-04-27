const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();


const app = express();


// Configuración para proxy inverso (Nginx) y express-rate-limit
app.set('trust proxy', 1);
app.disable('x-powered-by');

// Middleware para eliminar o enmascarar la cabecera "Server"
app.use((req, res, next) => {
  res.removeHeader('Server');
  res.setHeader('Server', 'Servidor Web Genérico'); 
  next();
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true
  },
  frameguard: {
    action: 'sameorigin'
  },
  referrerPolicy: {
    policy: 'no-referrer'
  }
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { ok: false, message: 'Too Many Requests' }
});

app.use('/api', apiLimiter);

// cors
app.use(cors({
  origin: [
    "https://www.plataformadebusqueda.gob.mx/"
  ],
  credentials: true,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization", "ngrok-skip-browser-warning"],
  preflightContinue: true
}));

// parseo del body (se asegura decodificación UTF-8)
app.use(express.json({ type: ['application/json', 'application/*+json'] }));
app.use(express.urlencoded({ extended: true }));


// Rutas
app.use('/api', require('./routes/twoFA'));
app.use('/api', require('./routes/reportes'));
// Manejador de rutas no válidas 
app.all('*', (req, res) => {
  return res.status(404).json({
    ok: false,
    message: 'ruta '
  });
});

const server = app.listen(process.env.PORT ?? 3000, '0.0.0.0', () => {
  console.log("server " + process.env.PORT);
});
server.timeout = 600000; 
