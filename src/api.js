const API_URL = "http://localhost:5000";

export async function agregarClientes(documento, nombre, email, telefono){
    const response = await fetch(`${API_URL}/clientes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({documento, nombre, email, telefono}),
    });
    return response.json(); 
}