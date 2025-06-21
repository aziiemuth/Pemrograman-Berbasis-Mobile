const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  nama_barang: String,
  harga: Number,
  stok: Number,
  kategori: String
});

module.exports = mongoose.model('Item', itemSchema);
