import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopBarAdmin.css";

const TopbarAdmin = ({ paginaActualAdmin }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/admin");
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
                    <li className={paginaActualAdmin === "usuariosAdmin" ? "active" : ""} 
                        onClick={() => navigate("/admin/gestUsers")}
                    >
                        <img src="/fotoUsuario.png" alt="Logo del sistema" className="logo" />
                        <span className="text">Gestión de Usuarios</span>
                    </li>
                    <li className={paginaActualAdmin === "inventarioAdmin" ? "active" : ""}
                        onClick={() => navigate("/admin/inventario")}
                    >
                        <span className="icon">📦</span>
                        <span className="text">Inventario</span>
                    </li>
                    <li className={paginaActualAdmin === "reporte" ? "active" : ""}
                        onClick={() => navigate("/admin/Reporte")}
                    >
                        <span className="icon" >📋 </span>
                        <span className="text">Reportes</span>
                    </li>
                    <li className={paginaActualAdmin === "clientesAdmin" ? "active" : ""}
                        onClick={() => navigate("/admin/Clientes")}
                    >
                        <span className="icon">👤</span>
                        <span className="text">Clientes</span>
                    </li>
                    <li onClick={() => handleLogout()} className="logout">
                        Cerrar sesión
                    </li>
                </ul>
            </nav>

            <span className="vendedor">Administrador</span>
        </div>
    );
};

export default TopbarAdmin;