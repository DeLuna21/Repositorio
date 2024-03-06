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



//star
app.listen(3000, function () {
    console.log(`Server on port ${app.get('port')}`);
});
 