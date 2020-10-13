const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  porcentaje: { type: Number, required: true },
});

module.exports = model("Producto", ProductoSchema);
