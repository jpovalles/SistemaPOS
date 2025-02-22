import logo from './logo.svg';
import './App.css';
import Topbar from "./components/topBar";
import Log from "./pages/Login/Login";
import ListaProductos from "./components/listaProductos";
import ResumenCompra from "./components/resumenCompra";
import Login from "./pages/Login/Login"
import AdminView from "./pages/admin/AdminView"
import GestUsers from './pages/admin/gestUsuarios/GestUsers';
import Registrar from "./pages/Reg_clientes/Registrar";
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="app">
      {<Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/admin" element={<AdminView/>} />
        <Route path="/admin/gestUsers" element={<GestUsers/>} />
        <Route path="/Registro" element={<Registrar/>}/>
      </Routes>}
      <Topbar />
    </div>
  )
}

export default App;
