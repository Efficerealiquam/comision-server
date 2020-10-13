const Producto = require("../../models/Producto");
const { UserInputError } = require("apollo-server");
module.exports = {
  Query: {
    getProducto: async (_, { proId }) => {
      try {
        const producto = await Producto.findById(proId);

        if (producto) {
          return producto;
        } else {
          throw new Error("Producto no encontrado");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getProductos: async () => {
      try {
        const productos = await Producto.find().sort({
          createdAt: -1,
        });
        return productos;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    /* Crear un Producto */
    createProducto: async (
      _,
      { productoInput: { nombre, precio, porcentaje } }
    ) => {
      const errors = {};
      if (nombre.trim() === "") {
        errors.nombre = "Ingrese un nombre";
        throw new UserInputError("Introdusca un nombre", {
          errors,
        });
      }
      if (precio <= 0) {
        errors.precio = "Ingrese un precio ";
        throw new UserInputError("Ingrese un precio", {
          errors,
        });
      }
      if (porcentaje <= 0) {
        errors.porcentaje = "Ingrese un porcentaje ";
        throw new UserInputError("Ingrese un porcentaje", {
          errors,
        });
      }

      const newProducto = new Producto({
        nombre,
        precio,
        porcentaje,
      });
      const producto = await newProducto.save();
      return producto;
    },
    /* Actualizar Producto */
    updateProducto: async (_, { id, precio, porcentaje }) => {
      try {
        const errors = {};
        if (precio <= 0) {
          errors.precio = "Ingrese un precio ";
          throw new UserInputError("Ingrese un precio", {
            errors,
          });
        }
        if (porcentaje <= 0) {
          errors.porcentaje = "Ingrese un porcentaje ";
          throw new UserInputError("Ingrese un porcentaje", {
            errors,
          });
        }

        const upProducto = await Producto.findById(id);
        if (upProducto) {
          const upPro = await Producto.findByIdAndUpdate(id, {
            precio,
            porcentaje,
          });
          return upPro;
        } else {
          throw new Error("Producto no encontrado");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    /* Delete Producto */
    deleteProducto: async (_, { proId }) => {
      try {
        const producto = await Producto.findByIdAndDelete(proId);
        if (producto) {
          return "Se elimino el producto";
        } else {
          throw new Error("El producto no existe");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
