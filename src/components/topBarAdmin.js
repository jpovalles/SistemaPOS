import React from "react";
import { useNavigate } from "react-router-dom";
import "./topBar.css";

const Topbar = ({ paginaActualAdmin }) => {
    const navigate = useNavigate();
    return (
        <div className="topbar">
            <h2 className="title">
                <span className="sistema">SISTEMA</span>{" "}
                <span className="pos">POS</span>
            </h2>
            <nav className="menu">
                <ul>
                    <li className={paginaActualAdmin === "usuariosAdmin" ? "active" : ""} 
                        onClick={() => navigate("/admin/gestUsers")}
                    >
                        <img src="/fotoUsuario.png" alt="Logo del sistema" className="logo" />
                        <span className="text">Gestión de Usuarios</span>
                    </li>
                    <li className={paginaActualAdmin === "inventarioAdmin" ? "active" : ""}
                        // onClick={() => navigate("/admin/inventario")}
                    >
                        <span className="icon">📦</span>
                        <span className="text">Inventario</span>
                    </li>
                    <li className={paginaActualAdmin === "reporte" ? "active" : ""}
                        // onClick={() => navigate("/vendedor/facturacion")}
                    >
                        <span className="icon" >📋 </span>
                        <span className="text">Reportes</span>
                    </li>
                    <li className={paginaActualAdmin === "usuarioAdmin" ? "active" : ""}>
                        <span className="icon">👤</span>
                        <span className="text">Usuario</span>
                    </li>
                </ul>
            </nav>

            <span className="vendedor">Administrador</span>
        </div>
    );
};

export default Topbar;