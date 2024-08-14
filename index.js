const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const registroRoutes = require('./routes/registroRoutes'); 

// Importar rutas adicionales si son necesarias en el futuro
// const routesCliente = require('./routes/routesCliente.js');
// const routesProducto = require('./routes/routesProducto.js');
// const routesCategoria = require('./routes/routesCategoria.js');
// const auth = require('./routes/auth.js');

require('dotenv').config();

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

// Servir los archivos estáticos
app.use(express.static('public'));

// Prefijo para todas las rutas de registro
app.use('/registro', registroRoutes);

// Rutas adicionales si se necesitan en el futuro
// app.use('/', routesCliente);
// app.use('/', routesProducto);
// app.use('/', routesCategoria);
// app.use('/', auth);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
