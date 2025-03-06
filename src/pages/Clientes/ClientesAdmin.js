import { useEffect, useState } from "react";
import TopbarAdmin from "../../components/TopBarAdmin";
import "./ClientesAdmin.css";
import { obtenerClientes } from "../../api";

const ClientesAdmin = () => {

  const [clientes, setClientes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [clienteEdit, setClienteEdit] = useState([]);

  useEffect(() => {
    async function cargarClientes(){
      const data = await obtenerClientes();
      setClientes(data);
    }
    cargarClientes();
  }, []);

  const eliminarCliente = (documento) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar al cliente?");
    if (confirmacion) {
      setClientes(clientes.filter((cliente) => cliente.documento !== documento));
    }
  };

  const editarCliente = (cliente) => {
    setEditando(cliente.documento);
    setClienteEdit(cliente);
  };

  const guardarEdicion = () => {
    setClientes(clientes.map((c) => (c.documento === clienteEdit.documento ? clienteEdit : c)));
    setEditando(null);
  };

  return (
    <div className="container">
      <TopbarAdmin paginaActualAdmin="clientesAdmin" />
      <h2 className="title-Clientes">Lista de Clientes</h2>
      <table className="clientes-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Número</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.documento}>
              {editando === cliente.documento ? (
                <>
                  <td><input value={clienteEdit.nombre} onChange={(e) => setClienteEdit({ ...clienteEdit, nombre: e.target.value })} /></td>
                  <td><input value={clienteEdit.documento} onChange={(e) => setClienteEdit({ ...clienteEdit, documento: e.target.value })} /></td>
                  <td><input value={clienteEdit.telefono} onChange={(e) => setClienteEdit({ ...clienteEdit, telefono: e.target.value })} /></td>
                  <td><input value={clienteEdit.email} onChange={(e) => setClienteEdit({ ...clienteEdit, email: e.target.value })} /></td>
                  <td>
                    <button onClick={guardarEdicion} className="btn save">Guardar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.documento}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.email}</td>
                  <td className="btn">
                    <button onClick={() => editarCliente(cliente)} className="btn edit">Editar</button>
                    <button onClick={() => eliminarCliente(cliente.documento)} className="btn delete">Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesAdmin;