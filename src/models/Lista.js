const { Schema, model } = require("mongoose");

const ListaSchema = new Schema({
  productos: [
    {
      nombre: { type: String },
      precio: { type: Number },
      porcentaje: { type: Number },
      cantidad: { type: Number },
    },
  ],
});

module.exports = model("Lista", ListaSchema);
