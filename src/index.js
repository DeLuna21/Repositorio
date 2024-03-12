const express = require('express');
const morgan = require('morgan');
const app = express();

//Setting
app.set('port' , process.env.PORT || 3000);
app.set('json spaces', 2);

//Mide
app.use(morgan ('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//router
app.use(require('./routes/index'));
app.use('/api/alumnos', require('./routes/alumnos'));

// Obtener la URL reenviada desde GitHub
const gitRemoteUrl = 'https://effective-space-memory-gg76g6g7w45fwvw6-3000.app.github.dev/';
const parsedUrl = new URL(gitRemoteUrl);
const gitRemoteHost = parsedUrl.hostname;
const gitRemotePort = parsedUrl.port || 3000; // Suponiendo el puerto 443 para HTTPS

// Iniciar servidor
app.listen(gitRemotePort, function () {
    console.log(`Servidor escuchando en la dirección reenviada por Git: ${gitRemoteUrl}`);
});
