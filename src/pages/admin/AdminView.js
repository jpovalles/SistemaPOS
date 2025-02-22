import React from 'react';
import './Admin.css';
import Sidebar from '../../components/sidebar';

function AdminView(){
    const username = localStorage.getItem("username") || "Invitado";
    return (
        <div className="admin-view">
            <div className="content">
                <h1>Bienvenido, <span>{username}</span></h1>
                <h2>Bienvenido al panel de <span>administrador</span>!</h2>
            </div>
        </div>
    );
}

export default AdminView;