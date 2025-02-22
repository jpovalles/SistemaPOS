import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login/Login";
import AdminView from "./pages/admin/AdminView";
import GestUsers from './pages/admin/gestUsuarios/GestUsers';
import Facturacion from './pages/facturacion/facturacion'
import Inventario from './pages/inventario/inventario'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/admin" element={<AdminView/>} />
        <Route path="/admin/gestUsers" element={<GestUsers/>} />
        <Route path="/admin/inventario" element={<Inventario/>} />
        <Route path="/vendedor/facturacion" element={<Facturacion/>} />
      </Routes>
    </div>
  );
}

export default App;

