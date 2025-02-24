import React from 'react';
import './GestUsers.css';
import TopBarAdmin from "../../../components/TopBarAdmin";
import { useState } from 'react';


function GestUsers(){


    const roles = ['Admin', 'Vendedor'];
    const [data, setData] = useState(
        {
            jpoc: { usuario: "jpoc", clave: "12345", nombre: "Juan Ovalles", rol: "Admin" },
            jpoc2: { usuario: "jpoc2", clave: "12345", nombre: "Juan Ovalles", rol: "Admin" },
            jpoc3:{ usuario: "jpoc3", clave: "12345", nombre: "Juan Ovalles", rol: "Vendedor" },
            jpoc4: { usuario: "jpoc4", clave: "12345", nombre: "Juan Ovalles", rol: "Vendedor" }
        }
    );

    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [editItem, setEditItem] = useState({ name: '', description: '' });

    const handleDelete = (key) => {
        const newUsers = {...data}
        delete newUsers[key]
        setData(newUsers)
    }

    const handleAdd = () => {
        if (newItem.usuario && newItem.clave && newItem.nombre && newItem.rol) {
            setData({
                ...data,
                [newItem.usuario]: { ...newItem }
            });
            setNewItem({ usuario: '', clave: '', nombre: '', rol: '' });
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
                    {
                        /* 
                        <input
                            placeholder="Rol"
                            value={newItem.rol}
                            onChange={(e) => setNewItem({ ...newItem, rol: e.target.value })}
                        />
                        */
                    }
                    <select 
                        value={newItem.rol}
                        onChange={(e) => setNewItem({ ...newItem, rol: e.target.value })}
                        className="border p-2 rounded"
                        >
                        <option value="">Seleccionar Rol</option>
                        {roles.map(rol => (
                            <option key={rol} value={rol}>
                            {rol.charAt(0).toUpperCase() + rol.slice(1)}
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
            { Object.keys(data).length > 0 ? 
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
                    {Object.entries(data).map(([key, user]) => (
                        <tr key={key}>
                        <td className="px-4 py-2">{user.usuario}</td>
                        <td className="px-4 py-2">{user.clave}</td>
                        <td className="px-4 py-2">{user.nombre}</td>
                        <td className="px-4 py-2">{user.rol}</td>
                        <td className="iconsRow">
                            <div className={key}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="editIcon">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                </svg>
                            </div>
                            <div className={key} onClick={() => handleDelete(key)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="deleteIcon">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clip-rule="evenodd" />
                                </svg>
                            </div>

                        </td>
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