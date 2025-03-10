import React, { useState, useEffect, use } from "react";
import TopbarAdmin from "../../components/TopBarAdmin";
import "./InventarioAdmin.css";
import { obtenerInventario, agregarProducto } from "../../api";

const InventarioAdmin = () => {
  const [invenActual, setInvenActual] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [inventario, setInventario] = useState([]);
  const [searchState, setSearchState] = useState(false);
  const [newItem, setNewItem] = useState({ nombreProducto: '',  Precio: '', Cantidad: '' });
  const [mensaje, setMensaje] = useState('')

  const handleSearch = () => {
    const filtrados = inventario.filter(
      (producto) =>
        producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.idProducto.toString().includes(busqueda)
    );
    setInvenActual(filtrados);
    setSearchState(true);
  };

  const handleRestart = () => {
    setInvenActual(inventario);
    setSearchState(false);
    setBusqueda("");
  }

  const handleAdd = async(e) => {
          e.preventDefault(); 
          console.log(newItem)
          const nuevoProducto = await agregarProducto(newItem.nombreProducto, newItem.Precio, newItem.Cantidad);
          setInventario([...inventario, nuevoProducto]);
          setInvenActual([...inventario]);
          setNewItem({nombreProducto: '',  Precio: '', Cantidad: '' });
          setMensaje("Se registró correctamente el producto");
          setTimeout(() => setMensaje(""), 4000);
      };

  useEffect(() => {
      async function cargarInventario(){
        const data = await obtenerInventario();
        setInventario(data);
        setInvenActual(data);
      }
      cargarInventario();
    }, [inventario]);

  return (
    <div className="inventario-container">
        <TopbarAdmin paginaActualAdmin="inventarioAdmin"/>

        <div className='addProduct'>
          <input
              placeholder="Nombre producto"
              value={newItem.nombreProducto}
              onChange={(e) => setNewItem({ ...newItem, nombreProducto: e.target.value })}
          />
          <input
              placeholder="Precio"
              type="number"
              value={newItem.Precio}
              onChange={(e) => setNewItem({ ...newItem, Precio: e.target.value })}
          />
          <input
              placeholder="Cantidad"
              type="number"
              value={newItem.Cantidad}
              onChange={(e) => setNewItem({ ...newItem, Cantidad: e.target.value })}
          />
          
          <button className="addButton" onClick={handleAdd}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="addIcon">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                  </svg>
              
          </button>
      </div>

        <h1 className="tituloInventario">Inventario de Productos</h1>
        <h2 className="subtitulo">Buscar Producto</h2>
        <div className="busqueda-container">
            <input
                type="text"
                placeholder="Buscar por nombre o ID"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-busqueda"
            />
            <button className="boton-buscar" onClick={handleSearch}>Buscar</button>
            {searchState ? <button className="boton-buscar" onClick={handleRestart}>Limpiar busqueda</button>:<></>}

        </div>
        <h2 className="subtitulo">Resultado</h2>
        <table className="tabla-resultados">
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Id producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {invenActual.map((producto) => (
                <tr key={producto.idProducto}>
                    <td>{producto.idProducto}</td>
                    <td>{producto.nombreProducto}</td>
                    <td>${producto.Precio.toLocaleString("es-ES", { useGrouping: true })}</td>
                    <td>{producto.Cantidad}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default InventarioAdmin;