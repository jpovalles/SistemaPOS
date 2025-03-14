import { useEffect, useState } from "react";
import "./ReporteVentas.css";
import TopbarAdmin from "../../components/TopBarAdmin";
import { obtenerVentas } from "../../api";

function ReporteVentas() {
    const [ventas, setVentas] = useState([]);
    const [filtros, setFiltros] = useState({ fechaInicio: "", fechaFin: "", vendedor: "", cliente: "" });
    const [busquedaId, setBusquedaId] = useState();
    const [ventasFiltradas, setVentasFiltradas] = useState(ventas);

    const formatoFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString("es-ES")
    }

    useEffect(() => {
        async function cargarVentas(){
            const data = await obtenerVentas();
            console.log(data)
            setVentas(data);
            setVentasFiltradas(data);
        }
        cargarVentas();
    }, []);

    const filtrarVentas = () => {
        const resultado = ventas.filter((venta) => {
            return (
                (!filtros.fechaInicio || venta.fecha >= filtros.fechaInicio) &&
                (!filtros.fechaFin || venta.fecha <= filtros.fechaFin) &&
                (!filtros.vendedor || venta.vendedor.toLowerCase().includes(filtros.vendedor.toLowerCase())) &&
                (!filtros.cliente || venta.cliente.toLowerCase().includes(filtros.cliente.toLowerCase()))
            );
        });
        setVentasFiltradas(resultado);
    };

    // Buscar ventas por ID, vendedor o cliente
    const buscarVenta = () => {
        const resultado = ventas.filter((venta) =>
            Number(venta.factura) === Number(busquedaId),
        );
        setVentasFiltradas(resultado);
    };

    const exportar = (ventas, nombre_doc) => {
        if (ventas.length > 0){
            const encabezados = Object.keys(ventas[0]);
            const filas = ventas.map(obj => Object.values(obj));
            const contenido = [encabezados, ...filas].map(fila => fila.join(",")).join("\n");
            const blob = new Blob([contenido], { type: "text/csv"});
            const enlace = document.createElement("a");

            enlace.href = URL.createObjectURL(blob);
            enlace.download = nombre_doc || "Reporte.csv";

            document.body.appendChild(enlace);
            enlace.click();
            document.body.removeChild(enlace);
        }
    }

    const totalFacturas = ventasFiltradas.length;
    const totalVentas = ventasFiltradas.reduce((acum, venta) => acum + Number(venta.total), 0);

    return (
        <div className="contenedor-reporteVentas">
            <TopbarAdmin paginaActualAdmin="reporte"/>
            <div>
                <button className="btn-exportar" onClick={() => exportar(ventasFiltradas, "Reporte")}>Exportar</button>
            </div>
            <h2 className="titulo-reporteVentas">Historial de Ventas</h2>
            <div>
                <label className="sub-inicio">Fecha Inicio</label>
                <label className="sub-final">Fecha Final</label>
                <label className="sub-vendedor">Nombre del Vendedor</label>
                <label className="sub-cliente">Documento del Cliente</label>
            </div>
            <div className="filtros-container">
                <input className="input-reporteVentas" type="date" onChange={(e) => setFiltros({ ...filtros, fechaInicio: e.target.value })} />
                <input className="input-reporteVentas" type="date" onChange={(e) => setFiltros({ ...filtros, fechaFin: e.target.value })} />
                <input className="input-reporteVentas" type="text" placeholder="Vendedor" onChange={(e) => setFiltros({ ...filtros, vendedor: e.target.value })} />
                <input className="input-reporteVentas" type="text" placeholder="Cliente" onChange={(e) => setFiltros({ ...filtros, cliente: e.target.value })} />
                <button className="btn-primario" onClick={filtrarVentas}>Consultar</button>
            </div>

            <div className="busqueda-reporteVentas">
                <input className="input-reporteVentas" type="number" placeholder="Buscar por ID de Factura" onChange={(e) => setBusquedaId(e.target.value)} />
                <button className="btn-secundario" onClick={buscarVenta}>Buscar</button>
            </div>

            <table className="tabla-reporteVentas">
                <thead>
                    <tr>
                        <th>Factura</th>
                        <th>Fecha</th>
                        <th>Vendedor</th>
                        <th>Cliente</th>
                        <th>Total Venta</th>
                        <th>Método de Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {ventasFiltradas.length > 0 ? (
                        ventasFiltradas.map((venta) => (
                            <tr key={venta.factura}>
                                <td>{venta.factura}</td>
                                <td>{formatoFecha(venta.fecha)}</td>
                                <td>{venta.vendedor}</td>
                                <td>{venta.cliente}</td>
                                <td>{venta.total.toLocaleString()}</td>
                                <td>{venta.metodo}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No se encontraron resultados</td>
                        </tr>
                    )}
                    <tr className="fila-total">
                        <td colSpan="2"><b>Total Facturas:</b> {totalFacturas}</td>
                        <td colSpan="2"></td>
                        <td><b>Total Ventas:</b> {totalVentas.toLocaleString()}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ReporteVentas;
