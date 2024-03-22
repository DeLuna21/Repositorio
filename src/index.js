const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 

// Cargar variables de entorno desde un archivo .env
dotenv.config();

// Conexión a la base de datos MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Verificar conexión a MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function() {
  console.log('Conexión exitosa a MongoDB Atlas');
});

//Setting
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rutas
app.use(require('./routes/index'));
app.use('/api/alumnos', require('./routes/alumnos'));

// Obtener la URL reenviada desde GitHub
const gitRemoteUrl = 'https://humble-chainsaw-jxq9x9xqp5gh56g5-3000.app.github.dev/';
const parsedUrl = new URL(gitRemoteUrl);
const gitRemoteHost = parsedUrl.hostname;
const gitRemotePort = parsedUrl.port || process.env.PORT || 3000; // Utilizamos el puerto definido en las variables de entorno o el puerto 3000 como valor por defecto

// Iniciar servidor
app.listen(gitRemotePort, function() {
  console.log(`Servidor escuchando en la dirección reenviada por Git: ${gitRemoteUrl}`);
});
