import React, { useEffect } from 'react';
import './GestUsers.css';
import TopBarAdmin from "../../../components/TopBarAdmin";
import { useState } from 'react';
import {obtenerUsuarios, agregarUsuario, eliminarUsuario, actualizarUsuario } from "../../../api"


function GestUsers(){

    const roles = {'Administrador': 1, 'Vendedor': 0};
    const [data, setData] = useState([]);

    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [editing, setEditing] = useState(null);
    const [editItem, setEditItem] = useState([]);

    useEffect(() => {
        async function cargarUsuarios(){
            const dato = await obtenerUsuarios();
            setData(dato);
        }
        cargarUsuarios();
    }, [])

    const handleDelete = async (user) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?")    
        if (confirmacion){
            console.log("eliminando a: ", user);
            await eliminarUsuario(user);
            const data = await obtenerUsuarios();
            setData(data);
        }
    }

    const handleEdit = (user) => {
        setEditing(user.usuario);
        setEditItem(user);
    };

    const handleSave = async () => {
        const respuesta = await actualizarUsuario(
            editing,
            editItem.usuario,
            editItem.clave,
            editItem.nombre,
            editItem.rol
        )
        if (respuesta.success){
            const rolNombre = Object.keys(roles).find(key => roles[key] === parseInt(editItem.rol));
            setData(data.map((c) => (c.usuario === editing ? {...editItem, rol: rolNombre}: c)));
            setEditing(null);
        }else{
            alert(respuesta.message || "Error al modificar usuario")
        }
    };

    const handleAdd = async(e) => {
        if (newItem.usuario && newItem.clave && newItem.nombre && newItem.rol) {
            e.preventDefault();
            const nuevoUsuario = await agregarUsuario(newItem.usuario, newItem.clave, newItem.nombre, newItem.rol)
            const rolNombre = Object.keys(roles).find(key => roles[key] === parseInt(nuevoUsuario.rol));
            setData([...data, { ...nuevoUsuario, rol: rolNombre }]);
            setNewItem({ usuario: "", clave: "", nombre: "", rol: "" })
            }
    };
    
    return(
        <div className="gest-users">
            <TopBarAdmin paginaActualAdmin="usuariosAdmin"/>
            <div className='header'>
                <div className='title'>
                    <h1>Gestión de Usuarios</h1>
                </div>
                <div className='addUser'>
                    <input
                        placeholder="Usuario"
                        value={newItem.usuario}
                        onChange={(e) => setNewItem({ ...newItem, usuario: e.target.value })}
                    />
                    <input
                        placeholder="Clave"
                        type="password"
                        value={newItem.clave}
                        onChange={(e) => setNewItem({ ...newItem, clave: e.target.value })}
                    />
                    <input
                        placeholder="Nombre"
                        value={newItem.nombre}
                        onChange={(e) => setNewItem({ ...newItem, nombre: e.target.value })}
                    />
                    <select 
                        value={newItem.rol}
                        onChange={(e) => setNewItem({ ...newItem, rol: e.target.value })}
                        className="border p-2 rounded"
                        >
                        <option value="">Seleccionar Rol</option>
                        {Object.keys(roles).map((clave) => (
                            <option key={clave} value={roles[clave]}>
                            {clave.charAt(0).toUpperCase() + clave.slice(1)}
                            </option>
                        ))}
                    </select>
                    <button className="addButton" onClick={handleAdd}>
            
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="addIcon">
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                            </svg>
                        
                    </button>
                </div>
            </div>
            
            <div className='tableContent'>
            { data.length > 0 ? 
                (
                <table>
                    <thead>
                    <tr className='headerRow'>
                        <th className="headerGest">Usuario</th>
                        <th className="headerGest">Clave</th>
                        <th className="headerGest">Nombre</th>
                        <th className="headerGest">Rol</th>
                        <th className="headerGest">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((user) => (
                        <tr key={user.usuario}>
                        {editing === user.usuario ? (
                            <>
                                <td>
                                    <input
                                        value={editItem.usuario}
                                        onChange={(e) => setEditItem({ ...editItem, usuario: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <input
                                        placeholder="Clave"
                                        type="password"
                                        value={editItem.clave}
                                        onChange={(e) => setEditItem({ ...editItem, clave: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <input
                                        placeholder="Nombre"
                                        value={editItem.nombre}
                                        onChange={(e) => setEditItem({ ...editItem, nombre: e.target.value })}
                                    />
                                </td>
                                <td>
                                <select 
                                    value={editItem.rol}
                                    onChange={(e) => setEditItem({ ...editItem, rol: e.target.value })}
                                    className="border p-2 rounded"
                                    >
                                    <option value="">Seleccionar Rol</option>
                                    {Object.keys(roles).map((clave) => (
                                        <option key={clave} value={roles[clave]}>
                                        {clave.charAt(0).toUpperCase() + clave.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                </td>
                                <td>
                                    <div onClick={() => handleSave()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="saveIcon">
                                            <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
                                        </svg>
                                    </div>
                                </td>
                            </>
                        ) :(
                            <>
                            <td className="px-4 py-2">{user.usuario}</td>
                            <td className="px-4 py-2">{user.clave}</td>
                            <td className="px-4 py-2">{user.nombre}</td>
                            <td className="px-4 py-2">{user.rol}</td>
                            <td className="iconsRow">
                                <div className={user.usuario} onClick={() => handleEdit(user)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="editIcon">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                    </svg>
                                </div>
                                <div onClick={() => handleDelete(user.usuario)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="deleteIcon">
                                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </td>
                            </>
                        )


                        }                        
                        
                        </tr>
                    ))}
                    </tbody>
                </table>
                )
                :
                (
                <h1>
                    No hay usuarios registrados
                </h1>
                ) 
            }
            </div>

            
            </div>
        
    );
}

export default GestUsers;