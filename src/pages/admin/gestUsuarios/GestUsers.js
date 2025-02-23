import React from 'react';
import './GestUsers.css';
import TopBarAdmin from "../../../components/TopBarAdmin";


function GestUsers(){
    const data = [
        { usuario: "jpoc", clave: "123456789", nombre: "Juan Ovalles", rol: "admin" },
        { usuario: "jpoc", clave: "123456789", nombre: "Juan Ovalles", rol: "admin" },
        { usuario: "jpoc", clave: "123456789", nombre: "Juan Ovalles", rol: "admin" },
        { usuario: "jpoc", clave: "123456789", nombre: "Juan Ovalles", rol: "admin" },];
    return(
        <div className="gest-users">
            <TopBarAdmin paginaActualAdmin="usuariosAdmin"/>
            <div className='header'>
                <div className='title'>
                    <h1>Gestión de Usuarios</h1>
                </div>
                <div className='addUser'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            
            <table>
                <thead>
                <tr className='headerRow'>
                    <th className="headerGest">Nombre</th>
                    <th className="headerGest">Usuario</th>
                    <th className="headerGest">Clave</th>
                    <th className="headerGest">Rol</th>
                    <th className="headerGest">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                    <td className="px-4 py-2">{row.usuario}</td>
                    <td className="px-4 py-2">{row.clave}</td>
                    <td className="px-4 py-2">{row.nombre}</td>
                    <td className="px-4 py-2">{row.rol}</td>
                    <td className="iconsRow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="editIcon">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="deleteIcon">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clip-rule="evenodd" />
                        </svg>

                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        
    );
}

export default GestUsers;