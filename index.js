const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') 
const cors = require('cors')
const auth = require('./routes/auth.js')
const routesResultado = require('./routes/routesResultado.js')
const routesAmigo = require('./routes/routesAmigo.js')
const routesEquipo = require('./routes/routesEquipo.js')
const routesUsuario = require('./routes/routesUsuario.js')
const routesContrasenna =  require ('./routes/routesContrasenna.js')
require('dotenv').config()

// Establecer la conexión con MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

const app = express();

// Habilitar CORS
app.use(cors());

// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//servir los archivos estaticos
app.use(express.static('public'))

app.use('/',auth) //habilita la autenticacion
app.use('/',routesResultado) //habilitando las rutas de Resultado
app.use('/',routesAmigo)
app.use('/',routesEquipo)
app.use('/',routesUsuario)
app.use('/',routesContrasenna)


const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
