import React from "react";
import "./resumenCompra.css";

const ProductsSummary = () => {
  return (
    <div className="summary-container">
      <h2 className="summary-title"># Productos Agregados</h2>
      <div className="summary-card">
        <div className="summary-item">
          <span className="label">Total Bruto</span>
          <span className="amount">$0.00</span>
        </div>
        <div className="summary-item">
          <span className="label">Descuento</span>
          <span className="amount">$0.00</span>
        </div>
        <div className="summary-item">
          <span className="label">Impuestos</span>
          <span className="amount">$0.00</span>
        </div>
        <div className="summary-item total">
          <span className="label">Total Compra</span>
          <span className="amount">$0.00</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsSummary;
