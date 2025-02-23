import React from 'react';
import './Admin.css';

function AdminView(){
    const username = localStorage.getItem("username") || "Invitado";
    return (
        <div className="admin-view">
            <h1>Bienvenido, <span className='username'>{username}</span></h1>
            <h2>Bienvenido al panel de <span className='role'>administrador</span>!</h2>
        </div>
    );
}

export default AdminView;