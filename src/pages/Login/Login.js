import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const UNLOCK_PIN = "1234"; 

    const data = {
        jpoc: { usuario: "jpoc", clave: "123456789", nombre: "Juan Ovalles", rol: "admin" },
        jpoc2: { usuario: "jpoc2", clave: "123456789", nombre: "Juan Ovalles", rol: "admin" }
    };

    const [tries, setTries] = useState(5);
    const [loginStatus, setLoginStatus] = useState("");
    const [statusColor, setStatusColor] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);
    const [unlockPin, setUnlockPin] = useState("");

    const navigate = useNavigate();

    const authenticateUser = (user, password) => {
        return data[user] && data[user].clave === password;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (isBlocked) return;

        const userField = document.querySelector('.user');
        const passField = document.querySelector('.password');
        const user = userField.value;
        const password = passField.value;

        if (authenticateUser(user, password)) {
            setStatusColor("#58cf39");
            setLoginStatus("Login Exitoso");
            setTries(5);
            setIsBlocked(false);
            localStorage.setItem("username", user);
            setTimeout(() => navigate("/admin"), 1000);
        } else {
            if (tries - 1 === 0) {
                setIsBlocked(true);
                setLoginStatus("");
                userField.value = "";
                passField.value = "";
            } else {
                setStatusColor("#ff5252");
                setTries(tries - 1);
                setLoginStatus(`Credenciales no válidas. Intentos restantes: ${tries - 1}`);
                userField.value = "";
                passField.value = "";
            }
        }
    };

    const handleUnlock = (e) => {
        if (e.key === "Enter") {
            if (unlockPin === UNLOCK_PIN) {
                setIsBlocked(false);
                setTries(5);
                setUnlockPin("");

                document.querySelector('.user').value = "";
                document.querySelector('.password').value = "";
            } else {
                setUnlockPin("");
            }
        }
    };

    return (
        <div className="login">
            <div className="title_container">
                <h1 className="bienvenidos">Bienvenido al Sistema <span>POS</span></h1>
                <h2 className="ingresar-cred">Ingresa con tus credenciales para continuar</h2>
            </div>
            <div className="form_container">
                <form onSubmit={handleLogin}>
                    <p>Usuario:</p>
                    <input className="user" type="text" required placeholder="Ingrese su usuario" disabled={isBlocked} />

                    <p>Contraseña:</p>
                    <input className="password" type="password" required placeholder="Ingrese su contraseña" disabled={isBlocked} />

                    <button disabled={isBlocked}>Entrar</button>
                </form>
                {loginStatus && !isBlocked && (
                    <div className="login_status" style={{ backgroundColor: statusColor }}>{loginStatus}</div>
                )}
            </div>

            {isBlocked && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Has alcanzado el número máximo de intentos, el sistema se ha bloqueado.</p>
                        <div className="pin-container">
                            <p><strong>Ingrese el PIN de desbloqueo:</strong></p>
                            <input 
                                type="password" 
                                value={unlockPin} 
                                onChange={(e) => setUnlockPin(e.target.value)} 
                                onKeyDown={handleUnlock} 
                                placeholder="****"
                                className="pin-input-short"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
