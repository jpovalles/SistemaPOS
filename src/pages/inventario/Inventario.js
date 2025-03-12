import React, { useState, useEffect } from "react";
import Topbar from "../../components/TopBar";
import "./Inventario.css";
import {obtenerInventario} from '../../api'


const Inventario = () => {
  const [invenActual, setInvenActual] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [inventario, setInventario] = useState([]);
  const [searchState, setSearchState] = useState(false);

  const handleSearch = () => {
    const filtrados = inventario.filter((producto) => {
      if (!isNaN(busqueda) && busqueda.trim() !== "") {
        // Si la búsqueda es un número, hacer una comparación exacta con el ID
        return producto.idProducto.toString() === busqueda.trim();
      }
      // Si la búsqueda es una cadena, aplicar búsqueda parcial en nombre
      return producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase());
    });
  
    setInvenActual(filtrados);
    setSearchState(true);
  };

  useEffect(() => {
      async function cargarInventario(){
        const data = await obtenerInventario();
        setInventario(data);
        setInvenActual(data);
      }
      cargarInventario();
    }, []);

    const handleRestart = () => {
      setInvenActual(inventario);
      setSearchState(false);
      setBusqueda("");
    }

  return (
    <div className="inventario-container">
        <Topbar paginaActual="inventario"/>
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
                <tr key={producto.id}>
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

export default Inventario;
