const Lista = require("../../models/Lista");
const Producto = require("../../models/Producto");

module.exports = {
  Query: {
    getListaActual: async (_, { idLista }) => {
      const lista = await Lista.findById(idLista);
      if (lista) {
        return lista;
      } else {
        throw new Error("No tiene una lista Actualmente");
      }
    },
  },
  Mutation: {
    createListaAddPro: async (_, { proId, idLista, cantidad }) => {
      if (idLista) {
        const lista = await Lista.findById(idLista);
        const producto = await Producto.findById(proId);
        lista.productos.unshift({
          nombre: producto.nombre,
          precio: producto.precio,
          porcentaje: producto.porcentaje,
          cantidad,
        });
        await lista.save();
        const upL = await Lista.findById(idLista);
        return upL;
      } else {
        const producto = await Producto.findById(proId);
        const newLista = new Lista({
          productos: [
            {
              nombre: producto.nombre,
              precio: producto.precio,
              porcentaje: producto.porcentaje,
              cantidad,
            },
          ],
        });
        await newLista.save();
        return newLista;
      }
    },

    updateListaUpPro: async (_, { proId, idLista, cantidad }) => {
      try {
        const lista = await Lista.findByIdAndUpdate(
          idLista,
          {
            $set: {
              "productos.$[elem].cantidad": cantidad,
            },
          },
          {
            arrayFilters: [{ "elem._id": proId }],
            new: true,
          }
        );

        if (lista) {
          return lista;
        } else {
          throw new Error("Producto no encontrado");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteListaDelPro: async (_, { proId, idLista }) => {
      try {
        const lista = await Lista.findByIdAndUpdate(idLista, {
          $pull: {
            productos: {
              _id: proId,
            },
          },
        });
        if (lista) {
          return "El Producto a sido eliminada de la lista";
        } else {
          throw new Error("No se pudo eliminar el Producto de la lista");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
