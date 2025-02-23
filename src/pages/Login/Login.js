import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login(){

    const credentials = {
        "user1": "password1",
        "user2": "password2",
        "user3": "password3",
    }

    

    const [tries, setTries] = useState(3);
    const [loginStatus, setLoginStatus] = useState("");
    const [statusColor, setStatusColor] = useState("");
    
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = document.querySelector('.user').value;
        const password = document.querySelector('.password').value;
        if(credentials[user] === password){
            setStatusColor("#58cf39");
            setLoginStatus("Login Exitoso");
            setTries(3);
            localStorage.setItem("username", user);
            setTimeout(() => {
                navigate("/admin");
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