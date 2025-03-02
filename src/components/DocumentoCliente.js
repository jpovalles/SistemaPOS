import { useState } from "react";
import "./DocumentoCliente.css";

const DocumentoCliente = () => {

return (
  <div className="register-container">
    <h2>Documento Del Cliente</h2>
    <input
      type="number"
      placeholder="Ingrese el Documento"
    />
    <button>Buscar</button>
  </div>
);
};

export default DocumentoCliente;