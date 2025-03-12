import { useState } from "react";
import "./RegistrarProducto.css";

const RegistrarProductos = ({ agregarProducto }) => {
    const [codigo, setCodigo] = useState("");

    const handleAgregar = () => {
        if (codigo.trim() !== "") {
            agregarProducto(codigo);
            setCodigo("");
        }
    };

    return (
        <div className="register-container">
            <h2>Registrar Producto</h2>
            <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Código del Producto"
            />
            <button onClick={handleAgregar}>Agregar</button>
        </div>
    );
};

export default RegistrarProductos;
