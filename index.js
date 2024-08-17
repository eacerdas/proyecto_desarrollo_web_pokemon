const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') 
const cors = require('cors')
const routesResultado = require('./routes/routesResultado.js')
<<<<<<< HEAD
const auth = require('./routes/auth.js')
=======
const routesAmigo = require('./routes/routesAmigo.js')
const routesEquipo = require('./routes/routesEquipo.js')
const routesUsuario = require('./routes/routesUsuario.js')
>>>>>>> a25e1505230453672eda0c7edb7ce2afffcf7911
//const routesCliente = require('./routes/routesCliente.js')//importar las rutas para la gestion de clientes
//const routesProducto = require('./routes/routesProducto.js')
//const routesCategoria = require('./routes/routesCategoria.js')
//const auth = require('./routes/auth.js')
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

app.use('/',routesResultado) //habilitando las rutas de Resultado
<<<<<<< HEAD
app.use('/',auth) //habilita la autenticacion
=======
app.use('/',routesAmigo) //habilitando las rutas de Resultado
app.use('/',routesEquipo) //habilitando las rutas de Resultado
app.use('/',routesUsuario) //habilitando las rutas de Resultado
>>>>>>> a25e1505230453672eda0c7edb7ce2afffcf7911
//app.use('/',routesCliente) //habilitando las rutas del cliente
//app.use('/',routesProducto) // habilitando las rutas del producto
//app.use('/',routesCategoria)//habilitando las rutas de categoria
//app.use('/',auth) //habilitar la autenticacion


const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
