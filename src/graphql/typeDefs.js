const { gql } = require("apollo-server");

module.exports = gql`
  input ProductoInput {
    nombre: String!
    precio: Float!
    porcentaje: Float!
  }

  type Producto {
    id: ID!
    nombre: String!
    precio: Float!
    porcentaje: Float!
  }
  type ProductoLista {
    id: ID
    nombre: String!
    precio: Float!
    porcentaje: Float!
    cantidad: Int
  }
  type Lista {
    id: ID!
    productos: [ProductoLista]!
  }
  type Query {
    getListaActual(idLista: ID!): Lista
    """
    Query de los Productos
    """
    getProductos: [Producto]!
    getProducto(proId: ID): Producto!
  }
  type Mutation {
    createListaAddPro(proId: ID!, idLista: ID, cantidad: Int): Lista!
    updateListaUpPro(proId: ID!, idLista: ID, cantidad: Int): Lista!
    deleteListaDelPro(proId: ID!, idLista: ID!): String!
    """
    Mutation de los Productos
    """
    createProducto(productoInput: ProductoInput): Producto!
    updateProducto(id: ID!, precio: Float!, porcentaje: Float!): Producto!
    deleteProducto(proId: ID!): String!
  }
`;
