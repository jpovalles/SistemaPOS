import React, { useState, useContext } from "react";
import Topbar from "../../components/TopBar";
import ListaProductos from "../../components/ListaProductos";
import {ResumenCompra, calcularTotal} from "../../components/ResumenCompra";
import RegistrarProducto from "../../components/RegistrarProducto";
import ProductContext from "../../context/ProductContext";
import {DocumentoCliente} from "../../components/DocumentoCliente";
import "./Facturacion.css";
import { agregarVenta, obtenerDoc, obtenerProducto, actualizarInventario, sendMail } from "../../api";


const Facturacion = () => {

  const subject = 'Generacion de factura'

  const { productos, setProductos } = useContext(ProductContext);
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [facturaCancelada, setFacturaCancelada] = useState(false);
  const [cliente, setCliente] = useState("")
  const [metodoPago, setMetodoPago] = useState(null);
  const [montoEfectivo, setMontoEfectivo] = useState("");
  const [mensajeDoc, setMensajeDoc] = useState(""); 
  const [tipoMensaje, setTipoMensaje] = useState("");


  const fechaActual = new Date().toISOString().split("T")[0];
  
  const generarInformeVenta = (fechaActual, vendedor, documentoCliente, totalVenta, metodoPago, productos) =>{
    console.log(productos)
    let tablaHTML = `
        <h2>Informe de Venta</h2>
        <p><strong>Fecha:</strong> ${fechaActual}</p>
        <p><strong>Vendedor:</strong> ${vendedor}</p>
        <p><strong>Cliente:</strong> ${documentoCliente || "N/A"}</p>
        <p><strong>Método de Pago:</strong> ${metodoPago || "No especificado"}</p>

        <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="padding: 10px; background-color: #4CAF50; color: white;">Producto</th>
                    <th style="padding: 10px; background-color: #4CAF50; color: white;">Precio Unitario ($)</th>
                    <th style="padding: 10px; background-color: #4CAF50; color: white;">Cantidad</th>
                    <th style="padding: 10px; background-color: #4CAF50; color: white;">Total ($)</th>
                </tr>
            </thead>
            <tbody>`;

    productos.forEach(producto => {
        const totalProducto = producto.precio * producto.cantidad;
        tablaHTML += `
            <tr>
                <td style="padding: 10px; text-align: center;">${producto.nombre}</td>
                <td style="padding: 10px; text-align: center;">${producto.precio.toLocaleString()}</td>
                <td style="padding: 10px; text-align: center;">${producto.cantidad}</td>
                <td style="padding: 10px; text-align: center;">${totalProducto.toLocaleString()}</td>
            </tr>`;
    });

    tablaHTML += `
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" style="padding: 10px; font-weight: bold; text-align: right;">Total Venta:</td>
                    <td style="padding: 10px; font-weight: bold; text-align: center;">${totalVenta.toLocaleString()}</td>
                </tr>
            </tfoot>
        </table>`;

    return tablaHTML;
  }

  const finalizarCompra = async () => {
    if (productos.length > 0 && metodoPago !== null) {
        const total = calcularTotal(productos);
        const vendedor = localStorage.getItem("usuario_actual");

        // Actualizar inventario en la BD
        const productosVenta = productos.map((producto) => ({
            codigo: producto.idProducto, 
            cantidad: producto.cantidad,
            nombre: producto.nombre
        }));

        const respuesta = await actualizarInventario(productosVenta);

        if (respuesta.success) {
            console.log("Inventario actualizado correctamente");
            await agregarVenta(fechaActual, vendedor, cliente.documento, total, metodoPago);
            if(cliente){
              const html = generarInformeVenta(fechaActual, vendedor, cliente.documento, total, metodoPago, productos)
              await sendMail(cliente.email, subject, html)
            }
            setCompraFinalizada(true);
            setProductos([]);
            localStorage.removeItem("productos"); // Limpiar carrito
            setMetodoPago(null);
            setMontoEfectivo("");
            setCliente("")

            setTimeout(() => {
                setCompraFinalizada(false);
            }, 3000);
        } else {
            alert(respuesta.message)
            console.error("Error al actualizar el inventario");
            return;
        }
    }

    if(metodoPago === null){
      alert("Elige el metodo de pago")
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
        }, 2000);
      }
    }
  };


  const discardClient = () => {
    setCliente("");
  }



  const establecerCliente = async (doc) => {
    const result = await obtenerDoc(doc);

    if (result.existe) {
      setCliente(result.cliente);
      setMensajeDoc("Cliente encontrado.");
      setTipoMensaje("encontrado");
    } else {
      setCliente(""); 
      setMensajeDoc("Cliente no encontrado.");
      setTipoMensaje("noEncontrado");
    }

    setTimeout(() => {
      setMensajeDoc("");
      setTipoMensaje("");
    }, 1000);
  };


  const agregarProducto = async (codigo) => {
    const productoEncontrado = await obtenerProducto(codigo);

    if (productoEncontrado) {
        setProductos([...productos, { 
            idProducto: productoEncontrado.idProducto,
            nombre: productoEncontrado.nombreProducto, 
            precio: productoEncontrado.Precio, 
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
            {cliente ?
            <div className="documento-cliente">
              <h2>Info del cliente</h2>
              <p>Documento: {cliente.documento}</p>
              <p>Nombre: {cliente.nombre}</p>
              <p>Email: {cliente.email}</p>
              <p>Teléfono: {cliente.telefono}</p>
              <button onClick={discardClient}>X</button>
            </div>
            :
            <DocumentoCliente agregarCliente={establecerCliente}/> 
            }
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

