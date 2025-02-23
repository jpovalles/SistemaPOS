import React, { useState } from "react";
import Topbar from "../../components/topBar";
import "./inventario.css";

const productosDisponibles = [
  { id: "001", nombre: "Arroz", precio: 10000, cantidad: 20 },
  { id: "002", nombre: "Salsa de Tomate", precio: 6000, cantidad: 15 },
  { id: "003", nombre: "Pollo", precio: 20000, cantidad: 10 },
  { id: "004", nombre: "Carne", precio: 26000, cantidad: 8 },
  { id: "005", nombre: "Frijoles", precio: 8000, cantidad: 25 },
];

const Inventario = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleSearch = () => {
    const filtrados = productosDisponibles.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.id.includes(busqueda)
    );
    setResultados(filtrados);
  };

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
                {resultados.map((producto) => (
                <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.id}</td>
                    <td>${producto.precio.toLocaleString("es-ES", { useGrouping: true })}</td>
                    <td>{producto.cantidad}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default Inventario;
