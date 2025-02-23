import React from 'react';
import './Admin.css';
import TopBarAdmin from '../../components/topBarAdmin';

function AdminView(){
    const username = localStorage.getItem("username") || "Invitado";
    return (
        <div className="admin-view">
            <TopBarAdmin paginaActualAdmin="active" />
            <h1>Bienvenido, <span className='username'>{username}</span></h1>
            <h2>Bienvenido al panel de <span className='role'>administrador</span>!</h2>
        </div>
    );
}

export default AdminView;