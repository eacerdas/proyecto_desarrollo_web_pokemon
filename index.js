const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') 
const cors = require('cors')
const routesResultado = require('./routes/routesResultado.js')
//const routesCliente = require('./routes/routesCliente.js')//importar las rutas para la gestion de clientes
//const routesProducto = require('./routes/routesProducto.js')
//const routesCategoria = require('./routes/routesCategoria.js')
//const auth = require('./routes/auth.js')
require('dotenv').config()

//establecer la conexion con mongo
mongoose.connect(process.env.MONGO_URI)

const app = express()

//habilitar cors
app.use(cors());

//habilitar body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//servir los archivos estaticos
app.use(express.static('public'))

app.use('/',routesResultado) //habilitando las rutas de Resultado
//app.use('/',routesCliente) //habilitando las rutas del cliente
//app.use('/',routesProducto) // habilitando las rutas del producto
//app.use('/',routesCategoria)//habilitando las rutas de categoria
//app.use('/',auth) //habilitar la autenticacion


const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})