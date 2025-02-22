import "./listaProductos.css";

const ListaProductos = ({ productos, eliminarProducto, modificarCantidad }) => {
  return (
    <div className="product-list">
      <h1 className="title">Lista de Productos</h1>
      <ul>
        {productos.map((producto, index) => (
          <li key={index} className="product-item">
            <span className="product-name">{producto.nombre}</span>
            <span className="precio-producto">${producto.precio.toLocaleString("es-ES", { useGrouping: true })}</span>
            <div className="quantity-controls">
              <button className="btn-control" onClick={() => modificarCantidad(index, -1)}> - </button>
              <span className="quantity">{producto.cantidad}</span>
              <button className="btn-control" onClick={() => modificarCantidad(index, 1)}> + </button>
            </div>
            <button className="btn-delete" onClick={() => eliminarProducto(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;



