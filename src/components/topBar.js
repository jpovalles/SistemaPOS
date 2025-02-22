import React from "react";
import "./topBar.css";

const Topbar = ({ paginaActual }) => {
    return (
        <div className="topbar">
            <h2 className="title">
                <span className="sistema">SISTEMA</span>{" "}
                <span className="pos">POS</span>
            </h2>
            <nav className="menu">
                <ul>
                    <li className={paginaActual === "clientes" ? "active" : ""}>
                        <img src="/fotoUsuario.png" alt="Logo del sistema" className="logo" />
                        <span className="text">Clientes</span>
                    </li>
                    <li className={paginaActual === "inventario" ? "active" : ""}>
                        <span className="icon">📦</span>
                        <span className="text">Inventario</span>
                    </li>
                    <li className={paginaActual === "cajas" ? "active" : ""}>
                        <span className="icon">💰</span>
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




