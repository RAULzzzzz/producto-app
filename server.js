const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');

const app = express();

// Configuración de middleware
app.use(express.json());
app.use(cors());

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/productdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error al conectar con MongoDB:', err));

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

// Ruta para agregar un producto (opcional)
app.post('/api/products', async (req, res) => {
  const { name, price } = req.body;
  const newProduct = new Product({ name, price });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el producto' });
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
