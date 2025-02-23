import { useState } from "react";
import "./RegistrarProducto.css";

const RegistrarProductos = ({ agregarProducto }) => {
const [nombre, setNombre] = useState("");

const handleAgregar = () => {
  if (nombre.trim() !== "") {
    agregarProducto(nombre);
    setNombre("");
  }
};

return (
  <div className="register-container">
    <h2>Registrar Producto</h2>
    <input
      type="text"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      placeholder="Código del Producto"
    />
    <button onClick={handleAgregar}>Agregar</button>
  </div>
);
};

export default RegistrarProductos;


