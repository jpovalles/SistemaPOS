import { useState } from "react";
import Topbar from "../../components/TopBar";
import "./Clientes.css";

const Clientes = () => {

  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Juan", documento: "4343432", numero: "7576657", correo: "juan@ex.com" },
    { id: 2, nombre: "Ana", documento: "323232", numero: "3131323", correo: "ana@ex.com" },
  ]);

  const [editando, setEditando] = useState(null);
  const [clienteEdit, setClienteEdit] = useState({});

  const eliminarCliente = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar al cliente?");
    if (confirmacion) {
      setClientes(clientes.filter((cliente) => cliente.id !== id));
    }
  };

  const editarCliente = (cliente) => {
    setEditando(cliente.id);
    setClienteEdit(cliente);
  };

  const guardarEdicion = () => {
    setClientes(clientes.map((c) => (c.id === clienteEdit.id ? clienteEdit : c)));
    setEditando(null);
  };

  return (
    <div className="container">
      <Topbar paginaActual="clientes" />
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
            <tr key={cliente.id}>
              {editando === cliente.id ? (
                <>
                  <td><input value={clienteEdit.nombre} onChange={(e) => setClienteEdit({ ...clienteEdit, nombre: e.target.value })} /></td>
                  <td><input value={clienteEdit.documento} onChange={(e) => setClienteEdit({ ...clienteEdit, documento: e.target.value })} /></td>
                  <td><input value={clienteEdit.numero} onChange={(e) => setClienteEdit({ ...clienteEdit, numero: e.target.value })} /></td>
                  <td><input value={clienteEdit.correo} onChange={(e) => setClienteEdit({ ...clienteEdit, correo: e.target.value })} /></td>
                  <td>
                    <button onClick={guardarEdicion} className="btn save">Guardar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.documento}</td>
                  <td>{cliente.numero}</td>
                  <td>{cliente.correo}</td>
                  <td className="btn">
                    <button onClick={() => editarCliente(cliente)} className="btn edit">Editar</button>
                    <button onClick={() => eliminarCliente(cliente.id)} className="btn delete">Eliminar</button>
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

export default Clientes;
