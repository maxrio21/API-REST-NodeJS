//index.js
const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger'); // Reemplaza con la ruta correcta
const UsuarioRouter = require('./v1/routes/usuarioRoutes');
const AlimentoRouter = require('./v1/routes/alimentoRoutes');
const NutricionRouter = require('./v1/routes/nutricionRoutes');
const ForoRouter = require('./v1/routes/foroRoutes');
const PerfilRouter = require('./v1/routes/perfilRoutes');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware para registrar cada solicitud
app.use((req, res, next) => {
  logger.info(`Solicitud recibida: ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/v1/usuarios', UsuarioRouter); 
app.use('/api/v1/alimentos', AlimentoRouter); 
app.use('/api/v1/nutricion', NutricionRouter); 
//app.use('/api/v1/foro', ForoRouter); 
app.use('/api/v1/perfil', PerfilRouter); 

app.listen(PORT, () => {
  logger.info(`Servidor escuchando en el puerto ${PORT}`);
});
