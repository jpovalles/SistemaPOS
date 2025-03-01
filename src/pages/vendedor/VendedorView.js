import React from 'react';
import './VendedorView.css';
import TopBar from '../../components/TopBar';

function VendedorView(){
    const username = localStorage.getItem("username") || "Invitado";
    return (
        <div className="vendedor-view">
            <TopBar paginaActual="active" />
            <h1>Bienvenido, <span className='username'>{username}</span></h1>
            <h2>Bienvenido al panel de <span className='role'>vendedor</span>!</h2>
        </div>
    );
}

export default VendedorView;