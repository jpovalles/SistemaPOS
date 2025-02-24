import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login(){

    
    const [data, setData] = useState(
        {
            jpoc: { usuario: "jpoc", clave: "12345", nombre: "Juan Ovalles", rol: "Admin" },
            jpoc2: { usuario: "jpoc2", clave: "12345", nombre: "Juan Ovalles", rol: "Admin" },
            jpoc3:{ usuario: "jpoc3", clave: "12345", nombre: "Juan Ovalles", rol: "Vendedor" },
            jpoc4: { usuario: "jpoc4", clave: "12345", nombre: "Juan Ovalles", rol: "Vendedor" }
        }
    );

    const authenticateUser = (user, password) => {
        if(data[user]){
            if(data[user].clave === password){
                return true;
            }
        }
        return false;
    }

    

    const [tries, setTries] = useState(3);
    const [loginStatus, setLoginStatus] = useState("");
    const [statusColor, setStatusColor] = useState("");
    
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = document.querySelector('.user').value;
        const password = document.querySelector('.password').value;
        if(authenticateUser(user, password)){
            setStatusColor("#58cf39");
            setLoginStatus("Login Exitoso");
            setTries(3);
            localStorage.setItem("username", user);
            setTimeout(() => {
                data[user].rol === "Admin" ? navigate("/admin") : navigate("/vendedor/RegistroClientes");
                
            }, 1000);
        }else{
            setStatusColor("#ff5252");
            setTries(tries - 1);
            setLoginStatus("Credenciales no válidas. Intentos restantes: "+ (tries-1));
            document.querySelector('.user').value = "";
            document.querySelector('.password').value = "";
        }

        
    }

    return(
    <div className="login">
        <div className="title_container">
            <h1 className="bienvenidos">
                Bienvenido al Sistema <span>POS</span>
            </h1>
            <h2 className="ingresar-cred">
                Ingresa con tus credenciales para continuar
            </h2>
        </div>
        <div className="form_container">
            <form onSubmit={handleLogin}>
                <p>Usuario:</p>
                <input className="user" type="text" required placeholder="Ingrese su usuario" />

                <p>Contraseña:</p>
                <input className="password" type="password" required placeholder="Ingrese su contraseña" />

                <button>Entrar</button>
            </form>
            {loginStatus && <div className="login_status" style={{ backgroundColor: statusColor }}>{loginStatus}</div>}
        </div>
    </div>
    )
}

export default Login;