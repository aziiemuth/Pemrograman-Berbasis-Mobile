const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/tokoku')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());
app.use('/items', itemRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
