import "./listaProductos.css";

const ProductList = () => {
  const productos = Array(5).fill("Producto");

  return (
    <div className="product-list">
      <h1 className="title">Lista de Productos</h1>
      <ul>
        {productos.map((producto, index) => (
          <li key={index} className="product-item">
            <span className="product-name">{producto}</span>
            <div className="quantity-controls">
              <button className="btn-control"> - </button>
              <span className="quantity">1</span>
              <button className="btn-control"> + </button>
            </div>
            <button className="btn-delete">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;



