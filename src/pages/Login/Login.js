import React, { useState } from 'react';
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
    


    const handleLogin = (e) => {
        e.preventDefault();
        const user = document.querySelector('.user').value;
        const password = document.querySelector('.password').value;
        if(credentials[user] === password){
            setStatusColor("#58cf39");
            setLoginStatus("Login Exitoso");
            setTries(3);
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
        <h1>
            Bienvenido al Sistema <span>POS</span>
        </h1>
        <h2>Ingresa con tus credenciales para continuar</h2>
        <div className="form-container">
            <form onSubmit={handleLogin}>
                <p>Usuario:</p>
                <input className="user" type="text" required placeholder="Ingrese su usuario" />

                <p>Contraseña:</p>
                <input className="password" type="password" required placeholder="Ingrese su contraseña" />

                <button>Entrar</button>
            </form>
            {loginStatus && <div className="login-status" style={{ backgroundColor: statusColor }}>{loginStatus}</div>}
        </div>
    </div>
    )
}

export default Login;