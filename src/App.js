import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login/Login"
import AdminView from "./pages/admin/AdminView"
import VendedorView from "./pages/vendedor/VendedorView"
import GestUsers from './pages/admin/gestUsuarios/GestUsers';
import Registrar from "./pages/Reg_clientes/Registrar";
import Facturacion from './pages/facturacion/Facturacion'
import InventarioVendedor from "./pages/inventario/Inventario";
import InventarioAdmin from "./pages/inventario/InventarioAdmin";
import Clientes from "./pages/Clientes/Clientes"
import ClientesAdmin from "./pages/Clientes/ClientesAdmin"


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/admin" element={<AdminView/>} />
        <Route path="/vendedor" element={<VendedorView/>} />
        <Route path="/admin/gestUsers" element={<GestUsers/>} />
        <Route path="/vendedor/inventario" element={<InventarioVendedor/>} />
        <Route path="/admin/inventario" element={<InventarioAdmin/>} />
        <Route path="/vendedor/facturacion" element={<Facturacion/>} />
        <Route path="/vendedor/RegistroClientes" element={<Registrar/>}/> 
        <Route path="/vendedor/Clientes" element={<Clientes/>}/>
        <Route path="/admin/Clientes" element={<ClientesAdmin/>}/>
      </Routes>
    </div>
  );
}

export default App;

