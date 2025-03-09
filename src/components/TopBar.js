import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

const Topbar = ({ paginaActual }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/vendedor");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");  // Elimina el token de autenticación
        localStorage.removeItem("rol");    // Elimina el rol del usuario
        window.location.href = "/";   // Redirige al usuario al login
    };
    return (
        <div className="topbar">
            <h2 className="title" onClick={handleClick} style={{ cursor: "pointer" }}>
                <span className="sistema">SISTEMA</span>{" "}
                <span className="pos">POS</span>
            </h2>
            <nav className="menu">
                <ul>
                    <li className={paginaActual === "Gestionclientes" ? "active" : ""} 
                        onClick={() => navigate("/vendedor/RegistroClientes")}
                    >
                        <img src="/fotoUsuario.png" alt="Logo del sistema" className="logo" />
                        <span className="text">Gestión Clientes</span>
                    </li>
                    <li className={paginaActual === "inventario" ? "active" : ""}
                        onClick={() => navigate("/vendedor/inventario")}
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
                    <li className={paginaActual === "clientes" ? "active" : ""}
                        onClick={() => navigate("/vendedor/clientes")}
                    >
                        <span className="icon">👤</span>
                        <span className="text">Clientes</span>
                    </li>
                    <li onClick={() => handleLogout()} className="logout">
                        Cerrar sesión
                    </li>
                </ul>
            </nav>
            <span className="vendedor">Vendedor</span>
        </div>
    );
};

export default Topbar;




