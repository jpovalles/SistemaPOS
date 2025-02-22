import React from "react";
import "./topBar.css";
import { Link } from "react-router-dom";

const Topbar = () => {
    return (
        <div className="topbar">
            <h2 className="logo-title">
                <span className="sistema">SISTEMA</span>{" "}
                <span className="pos">POS</span>
            </h2>
            <nav className="menu">
                <ul>
                    <Link to="/Registro">
                    <li>
                        <img src="/fotoUsuario.png" alt="Logo del sistema" className="logo" />
                        <span className="text">Clientes</span>
                    </li>
                    </Link>
                    <li>
                        <span className="icon">📦</span>
                        <span className="text">Inventario</span>
                    </li>
                    <li>
                        <span className="icon">💰</span>
                        <span className="text">Cajas</span>
                    </li>
                    <li>
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




