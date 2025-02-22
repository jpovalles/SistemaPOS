import React from 'react';
import './GestUsers.css';

function GestUsers(){
    const data = [
        { id: 1234, nombre: "Juan Pablo Ovalles Ceron", usuario: "jpoc", clave: "123456789", rol: "admin" },
        { id: 1234, nombre: "Juan Ovalles", usuario: "jpoc", clave: "123456789", rol: "admin" },
        { id: 1234, nombre: "Juan Ovalles", usuario: "jpoc", clave: "123456789", rol: "admin" },];
    return(
        <div className="gest-users">
            <div className='header'>
                <div className='title'>
                    <h1>Gestión de Usuarios</h1>
                </div>
                <div className='addUser'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#38b6ff" class="size-5">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            
            <table>
                <thead>
                <tr className='headerRow'>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Usuario</th>
                    <th className="px-4 py-2 text-left">Clave</th>
                    <th className="px-4 py-2 text-left">Rol</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                    <td className="px-4 py-2">{row.id}</td>
                    <td className="px-4 py-2">{row.nombre}</td>
                    <td className="px-4 py-2">{row.usuario}</td>
                    <td className="px-4 py-2">{row.clave}</td>
                    <td className="px-4 py-2">{row.rol}</td>
                    <td className="iconsRow">
                        <p>Editar</p>
                        <p>Eliminar</p>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        
    );
}

export default GestUsers;