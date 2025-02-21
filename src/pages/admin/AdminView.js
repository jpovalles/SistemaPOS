import React from 'react';
import Sidebar from '../../components/sidebar';

const AdminView = () => {
    return (
        <div className="admin-view">
            <Sidebar/>
            <div className="content">
                <h1>Administrador</h1>
                <p>¡Bienvenido al panel de administrador!</p>
            </div>
        </div>
    );
}

export default AdminView;