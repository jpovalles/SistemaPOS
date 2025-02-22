import style from "./Registrar.css";
import React from "react";
import { useState } from "react";

function Registrar(){

    const [formData, setFormData] = useState({
        nombre:"", documento:"", correo:"", telefono:"",
    })

    const[clientes, setClientes] = useState([]);

    const cambios = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    const envio = () => {
        setClientes([...clientes, formData]);
        setFormData({nombre:"", documento:"", xorreo:"", telefono:""})
    }
    
    return(
        <div>
            <div className="cont_titulo">
                <h1 className="titulo">Registrar Clientes</h1>
            </div>
            <div className="cont_form">
                <form onSubmit={envio}>
                    <h3 className="nombres">Nombre</h3>
                    <input onChange={cambios} value={formData.nombre} type="text" name="nombre" className="form" required/>
                    <h3 className="nombres">Documento</h3>
                    <input onChange={cambios} value={formData.documento} type="text" name="documento" placeholder="Solo números" className="form" required/>
                    <h3 className="nombres">Teléfono</h3>
                    <input onChange={cambios} value={formData.telefono} type="text" name="telefono" placeholder="Solo números" className="form" required/>
                    <h3 className="nombres">Correo electrónico</h3>
                    <input onChange={cambios} value={formData.correo} type="email" name="correo" className="form" required/>
                    <div className="cont_botones">
                        <button type="button" className="boton cancelar" onClick={() => setFormData({nombre:"", documento:"", correo:"", telefono:""})}>Cancelar</button>
                        <button type="submit" className="boton enviar" >Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registrar;