import React, { useState } from "react";
import "./ResumenCompra.css";

export const calcularTotal = (productos) => productos.reduce(
    (acum, producto) => acum + producto.precio * producto.cantidad,
    0
  );

export const ResumenCompra = ({ productos, metodoPago, setMetodoPago, montoEfectivo, setMontoEfectivo }) => {
  const [mensajePago, setMensajePago] = useState(""); // Estado para el mensaje de pago

  const handlePagoTarjeta = () => {
    if (productos.length > 0) {
      setMensajePago(""); // Limpiar mensaje anterior
      setMetodoPago("tarjeta");
      setTimeout(() => {
        const exito = Math.random() < 0.5; // 50% de probabilidad de éxito
        setMensajePago(exito ? "Transacción realizada con éxito." : "No se leyó bien la tarjeta, intente nuevamente.");
      }, 500);
    }
  };

  const handlePagoEfectivo = () => {
    if (productos.length > 0){
      setMetodoPago("efectivo");
      setMensajePago(""); 
      setMontoEfectivo("");
    }
  };

  const total = calcularTotal(productos);

  const descuento = 0;
  const devolucion = montoEfectivo !== "" ? Math.max(Number(montoEfectivo) - total, 0) : "";

  return (
    <div className="summary-container">
      <h2 className="summary-title">Resumen Compra</h2>
      <div className="summary-card">
        <div className="summary-item">
          <span className="label">Total Bruto</span>
          <span className="amount">${Math.round(total / 1.19)}</span>
        </div>
        <div className="summary-item">
          <span className="label">Descuento</span>
          <span className="amount">${descuento}</span>
        </div>
        <div className="summary-item">
          <span className="label">Impuestos</span>
          <span className="amount">${Math.round(total - total / 1.19)}</span>
        </div>
        <div className="summary-item total">
          <span className="label">Total Compra</span>
          <span className="amount">${total}</span>
        </div>
      </div>

      <div className="pagos-butt">
        <button
          className="pay-button card"
          onClick={handlePagoTarjeta}
        >
          Pagar con Tarjeta
        </button>

        <button
          className="pay-button cash"
          onClick={handlePagoEfectivo}
        >
          Pagar en Efectivo
        </button>

        {mensajePago && metodoPago === "tarjeta" && (
          <div className="mensaje-pago">
            <span>{mensajePago}</span>
          </div>
        )}
      </div>

      <div className="cash-payment-container">
        {metodoPago === "efectivo" && (
          <div className="cash-payment">
            <h2 className="title-monto">Ingrese el monto recibido</h2>
            <input
              type="number"
              value={montoEfectivo}
              onChange={(e) => setMontoEfectivo(e.target.value)}
              placeholder="Monto recibido"
            />
            {montoEfectivo !== "" && (
              <div className="devolucion">
                <span>Devolución: ${devolucion}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};