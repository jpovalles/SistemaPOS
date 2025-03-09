const API_URL = "http://localhost:5000";


// CRUD de clientes
export async function agregarClientes(documento, nombre, email, telefono){
    const response = await fetch(`${API_URL}/clientes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({documento, nombre, email, telefono}),
    });
    return response.json(); 
}

export async function obtenerClientes() {
    const response = await fetch(`${API_URL}/clientes`);
    return response.json();
}

export async function eliminarCliente(documento) {
    const response = await fetch(`${API_URL}/clientes/${documento}`, {
        method: "DELETE",
    });
    const data = await response.json();
    return data;
}

export async function actualizarCliente(doc, documento, nombre, email, telefono){
    const response = await fetch(`${API_URL}/clientes/${doc}`, {
        method: "PUT", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({documento, nombre, email, telefono}),
    });

    const data = await response.json();
    return data;
}



// CRUD de usuarios
export async function obtenerUsuarios() {
    const response = await fetch(`${API_URL}/usuarios`);
    return response.json();
}

export async function agregarUsuario(usuario, clave, nombre, rol){
    const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({usuario, clave, nombre, rol}),
    });
    return response.json(); 
}

export async function eliminarUsuario(usuario) {
    const response = await fetch(`${API_URL}/usuarios/${usuario}`, {
        method: "DELETE",
    });
    const data = await response.json();
    return data;
}

export async function actualizarUsuario(user, usuario, clave, nombre, rol){
    const response = await fetch(`${API_URL}/usuarios/${user}`, {
        method: "PUT", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({usuario, clave, nombre, rol}),
    });

    const data = await response.json();
    return data;
}

// Autenticación de usuarios
export async function login(usuario, clave){
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({usuario, clave}),
    });
    return response.json();
}