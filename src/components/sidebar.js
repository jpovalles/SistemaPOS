import React from "react";
import "./sidebar.css";

const Sidebar = () => {
    return (
      <div className="container">
        <div className="topbar">
          <h2>
            <span className="sistema">SISTEMA</span>{" "}
            <span className="pos">POS</span>
          </h2>
          <span className="vendedor">Vendedor</span>
        </div>
  
        <div className="sidebar">
          <nav>
            <ul>
              <li>
                <img src="/fotoUsuario.png" alt="Logo del sistema" className="logo" />
                <span className="text">Registro de clientes</span>
              </li>
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
        </div>
      </div>
    );
  };
  

export default Sidebar;


