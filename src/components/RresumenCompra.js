import React from "react";
import "./resumenCompra.css";

const resumenCompra = ({productos}) => {

  const total = productos.reduce((acum, producto) => 
    acum + producto.precio * producto.cantidad, 0
  );

  const descuento = 0;

  return (
    <div className="summary-container">
      <h2 className="summary-title">Resumen Compra</h2>
      <div className="summary-card">
        <div className="summary-item">
          <span className="label">Total Bruto</span>
          <span className="amount">${Math.round(total/1.19)}</span>
        </div>
        <div className="summary-item">
          <span className="label">Descuento</span>
          <span className="amount">${descuento}</span>
        </div>
        <div className="summary-item">
          <span className="label">Impuestos</span>
          <span className="amount">${Math.round(total-(total/1.19))}</span>
        </div>
        <div className="summary-item total">
          <span className="label">Total Compra</span>
          <span className="amount">${total}</span>
        </div>
      </div>
    </div>
  );
};

export default resumenCompra;
