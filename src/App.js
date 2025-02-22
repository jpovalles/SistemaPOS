import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login/Login"
import AdminView from "./pages/admin/AdminView"
import GestUsers from './pages/admin/gestUsuarios/GestUsers';


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/admin" element={<AdminView/>} />
        <Route path="/admin/gestUsers" element={<GestUsers/>} />
      </Routes>
    </div>
  )
}

export default App;
