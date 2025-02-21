import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/sidebar";
import Log from "./pages/Login/Login"
import ListaProductos from "./components/listaProductos";
import ResumenCompra from "./components/resumenCompra";


function App() {
  return (
    <div className="app">
      <ResumenCompra />
    </div>
  );
}

export default App;
