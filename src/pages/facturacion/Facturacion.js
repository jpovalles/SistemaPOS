import React, { useState, useContext } from "react";
import Topbar from "../../components/TopBar";
import ListaProductos from "../../components/ListaProductos";
import {ResumenCompra, calcularTotal} from "../../components/ResumenCompra";
import RegistrarProducto from "../../components/RegistrarProducto";
import ProductContext from "../../context/ProductContext";
import {DocumentoCliente} from "../../components/DocumentoCliente";
import "./Facturacion.css";
import { agregarVenta, obtenerDoc } from "../../api";

const productosDisponibles = [
  { codigo: "001", nombre: "Arroz", precio: 10000 },
  { codigo: "002", nombre: "Salsa De tomate", precio: 6000 },
  { codigo: "003", nombre: "Pollo", precio: 20000 },
  { codigo: "004", nombre: "Carne", precio: 26000 },
  { codigo: "005", nombre: "Frijoles", precio: 8000 },
];

const Facturacion = () => {
  const { productos, setProductos } = useContext(ProductContext);
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [facturaCancelada, setFacturaCancelada] = useState(false);
  const [cliente, setCliente] = useState("")
  const [metodoPago, setMetodoPago] = useState(null);
  const [montoEfectivo, setMontoEfectivo] = useState("");

  const finalizarCompra = () => {
    if (productos.length > 0) {
      const total = calcularTotal(productos);
      const vendedor = localStorage.getItem("usuario_actual");
      console.log(vendedor)
      setCompraFinalizada(true);
      agregarVenta(vendedor, cliente, total, metodoPago);
      setProductos([]);
      localStorage.removeItem("productos"); // Limpiar localStorage
      setMetodoPago(null);
      setMontoEfectivo("");
      setTimeout(() => {
        setCompraFinalizada(false);
      }, 3000);
    }
  };

  const cancelarFactura = () => {
    if (productos.length > 0) {
      const confirmacion = window.confirm("¿Estás seguro de que deseas cancelar la factura?");
      if (confirmacion) {
        setFacturaCancelada(true);
        setProductos([]);
        localStorage.removeItem("productos"); // Limpiar localStorage
        setTimeout(() => {
          setFacturaCancelada(false);
        }, 3000);
      }
    }
  };

  const establecerCliente = async (doc) => {
    const result = await obtenerDoc(doc);
    if (result.existe){
      setCliente(result.cliente.documento);
    }
  }

  const agregarProducto = (codigo) => {
    const productoEncontrado = productosDisponibles.find((p) => p.codigo === codigo);
    if (productoEncontrado) {
      setProductos([...productos, { 
        nombre: productoEncontrado.nombre, 
        precio: productoEncontrado.precio, 
        cantidad: 1
      }]);
      setMensajeError("");
    } else {
      setMensajeError("No hay productos disponibles con ese código");
      setTimeout(() => setMensajeError(""), 3000);
    }
  };

  const eliminarProducto = (index) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

  const modificarCantidad = (index, cambio) => {
    const nuevaLista = productos.map((producto, i) =>
      i === index ? { ...producto, cantidad: Math.max(1, producto.cantidad + cambio) } : producto
    );
    setProductos(nuevaLista);
  };

  return (
    <div className="facturacion-container">
      <Topbar paginaActual="cajas" />

      <div className="content">
        <div className="product-section">
          {mensajeError && <div className="mensaje-error">{mensajeError}</div>}
          <ListaProductos
            productos={productos}
            eliminarProducto={eliminarProducto}
            modificarCantidad={modificarCantidad}
          />

          {compraFinalizada && (
            <div className="mensaje-finalizacion">
              <h2>¡Compra finalizada con éxito!</h2>
            </div>
          )}

          {facturaCancelada && (
            <div className="mensaje-cancelacionFactura">
              <h2>¡La factura fue cancelada con éxito!</h2>
            </div>
          )}

          <div className="button-container2">
            <button className="cancel-button" onClick={cancelarFactura}>
              Cancelar factura
            </button>
            <button className="finish-button" onClick={finalizarCompra}>
              Finalizar
            </button>
          </div>
        </div>

        <div className="summary-section">
        <ResumenCompra
            productos={productos}
            metodoPago={metodoPago}
            setMetodoPago={setMetodoPago}
            montoEfectivo={montoEfectivo}
            setMontoEfectivo={setMontoEfectivo}
          />
          <div className="documento-section">
            <DocumentoCliente agregarCliente={establecerCliente}/>
          </div>
        </div>
      </div>

      <div className="registro-section">
        <RegistrarProducto agregarProducto={agregarProducto} />
      </div>

    </div>
  );
};

export default Facturacion;


