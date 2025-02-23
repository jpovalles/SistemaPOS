import "./Registrar.css";
import React, { useState } from "react";
import Topbar from "../../components/TopBar";

function Registrar() {
    const [formData, setFormData] = useState({
        nombre: "", documento: "", correo: "", telefono: "",
    });

    const [clientes, setClientes] = useState([]);
    const [mensaje, setMensaje] = useState(""); // Estado para el mensaje de éxito

    const cambios = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const envio = (e) => {
        e.preventDefault(); 
        setClientes([...clientes, formData]);
        setFormData({ nombre: "", documento: "", correo: "", telefono: "" });
        setMensaje("Se registró correctamente el cliente");
        setTimeout(() => setMensaje(""), 3000);
    };

    return (
        <div>
            <Topbar paginaActual="clientes" />
            <div className="cont_titulo">
                <h1 className="titulo">Registrar Clientes</h1>
            </div>
            <div className="cont_form">
                <form onSubmit={envio}>
                    <h3 className="nombres">Nombre</h3>
                    <input onChange={cambios} value={formData.nombre} type="text" name="nombre" placeholder="Escribe el Nombre" className="form" required />
                    <h3 className="nombres">Documento</h3>
                    <input onChange={cambios} value={formData.documento} type="number" name="documento" placeholder="Escribe el Documento" className="form" required />
                    <h3 className="nombres">Teléfono</h3>
                    <input onChange={cambios} value={formData.telefono} type="number" name="telefono" placeholder="Escribe el Teléfono" className="form" required />
                    <h3 className="nombres">Correo electrónico</h3>
                    <input onChange={cambios} value={formData.correo} type="email" name="correo" placeholder="Escribe el Correo" className="form" required />
                    <div className="cont_botones">
                        <button type="button" className="boton cancelar" onClick={() => setFormData({ nombre: "", documento: "", correo: "", telefono: "" })}>Cancelar</button>
                        <button type="submit" className="boton enviar">Registrar</button>
                    </div>
                </form>
                {/* Mensaje de confirmación */}
                {mensaje && <p className="mensaje-exito">{mensaje}</p>}
            </div>
        </div>
    );
}

export default Registrar;
