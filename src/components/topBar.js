import React from "react";
import { useNavigate } from "react-router-dom";
import "./topBar.css";
import { Link } from "react-router-dom";

const Topbar = ({ paginaActual }) => {
    const navigate = useNavigate();
    return (
        <div className="topbar">
            <h2 className="title">
                <span className="sistema">SISTEMA</span>{" "}
                <span className="pos">POS</span>
            </h2>
            <nav className="menu">
                <ul>
                    <li className={paginaActual === "clientes" ? "active" : ""} 
                        onClick={() => navigate("/vendedor/Registro")}>
                        <img src="/fotoUsuario.png" alt="Logo del sistema" className="logo" />
                        <span className="text">Clientes</span>
                    </li>
                    <li className={paginaActual === "inventario" ? "active" : ""}
                        onClick={() => navigate("/admin/inventario")}
                    >
                        <span className="icon">📦</span>
                        <span className="text">Inventario</span>
                    </li>
                    <li className={paginaActual === "cajas" ? "active" : ""}
                        onClick={() => navigate("/vendedor/facturacion")}
                    >
                        <span className="icon" >💰 </span>
                        <span className="text">Cajas</span>
                    </li>
                    <li className={paginaActual === "usuario" ? "active" : ""}>
                        <span className="icon">👤</span>
                        <span className="text">Usuario</span>
                    </li>
                </ul>
            </nav>

            <span className="vendedor">Vendedor</span>
        </div>
    );
};

export default Topbar;




