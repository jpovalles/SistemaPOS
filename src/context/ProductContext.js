import { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  // Cargar productos desde localStorage al iniciar
  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosGuardados);
  }, []);

  // Guardar productos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  return (
    <ProductContext.Provider value={{ productos, setProductos }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

