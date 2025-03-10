import { useState } from "react";
import "./DocumentoCliente.css";

export const DocumentoCliente = ({agregarCliente}) => {
  const [cliente, setCliente] = useState("")
  const manejarAgregar = () => {
    agregarCliente(cliente);
    setCliente("")
  }

return (
  <div className="register-container">
    <h2>Documento Del Cliente</h2>
    <input
      type="number"
      value={cliente}
      onChange={(e) => setCliente(e.target.value)}
      placeholder="Ingrese el Documento"
    />
    <button onClick={manejarAgregar}>Buscar</button>
  </div>
);
};