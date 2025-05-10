// const API_URL = "https://sistemaposbackend-production.up.railway.app";
// const API_URL = "https://sistemapos-backend.onrender.com";
const API_URL = "sistema-pos-backend-git-main-jpovalles-projects.vercel.app";



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


// CRUD del inventario
// Leer inventario
export async function obtenerInventario() {
    const response = await fetch(`${API_URL}/inventario`);
    return response.json();
}

// Agregar producto al inventario
export async function agregarProducto(nombreProducto, Precio, Cantidad){
    const response = await fetch(`${API_URL}/inventario`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nombreProducto, Precio, Cantidad}),
    });
    return response.json(); 
}

// Eliminar producto del inventario
export async function eliminarProducto(idProducto) {
    const response = await fetch(`${API_URL}/inventario/${idProducto}`, {
        method: "DELETE",
    });
    const data = await response.json();
    return data;
}

// Actualizar un producto
export async function actualizarProducto(idProducto, nombre, precio, cantidad){
    const response = await fetch(`${API_URL}/inventario/${idProducto}`, {
        method: "PUT", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nombre, precio, cantidad}),
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

//agregar venta al historial
export async function agregarVenta(fecha, vendedor, cliente, total, metodo){
    const response = await fetch(`${API_URL}/venta`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({fecha, vendedor, cliente, total, metodo}),
    });
    return response.json(); 
}

export async function obtenerVentas() {
    const response = await fetch(`${API_URL}/ventas`);
    return response.json();
}

export async function obtenerDoc(documento){
    const response = await fetch(`${API_URL}/buscarcliente/${documento}`);
    const data = await response.json();
    return data;
}

// Obtener producto
export async function obtenerProducto(codigo) {
    const response = await fetch(`${API_URL}/producto/${codigo}`);

    if (!response.ok) {
        return null;
    }
    return response.json();
}

// actualizar inventario
export async function actualizarInventario(productos) {
    const response = await fetch(`${API_URL}/actualizar-inventario`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productos }),
    });
    return response.json();
}

export async function sendMail(to, subject, html){
    const response = await fetch(`${API_URL}/enviar-mail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({to, subject, html})
    })
    return response.json()
}
