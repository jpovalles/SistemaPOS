import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login/Login"
import AdminView from "./pages/admin/AdminView"
import GestUsers from './pages/admin/gestUsuarios/GestUsers';
import Registrar from "./pages/Reg_clientes/Registrar";
import Facturacion from './pages/facturacion/Facturacion'
import InventarioVendedor from "./pages/inventario/Inventario";
import InventarioAdmin from "./pages/inventario/InventarioAdmin";
import Clientes from "./pages/Clientes/Clientes"
import ClientesAdmin from "./pages/Clientes/ClientesAdmin"
import ReporteVentas from "./pages/ReporteVentas/ReporteVentas";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";
import VendedorView from "./pages/vendedor/VendedorView";


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminView/>} />
          <Route path="/admin/gestUsers" element={<GestUsers/>} />
          <Route path="/admin/inventario" element={<InventarioAdmin/>} />
          <Route path="/admin/Clientes" element={<ClientesAdmin/>}/>
          <Route path="/admin/Reporte" element={<ReporteVentas/>}/>
          <Route path="/vendedor/" element={<VendedorView/>} />
          <Route path="/vendedor/inventario" element={<InventarioVendedor/>} />
          <Route path="/vendedor/facturacion" element={<Facturacion/>} />
          <Route path="/vendedor/RegistroClientes" element={<Registrar/>}/> 
          <Route path="/vendedor/Clientes" element={<Clientes/>}/>
        </Route>
        <Route exact path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;

