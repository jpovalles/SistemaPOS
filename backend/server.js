require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

//Agregar cliente
app.post("/clientes", async (req, res) => {
    const {documento, nombre, email, telefono} = req.body;
    try{
        const result = await pool.query(
            "INSERT INTO clientes (documento, nombre, email, telefono) VALUES ($1, $2, $3, $4) RETURNING *", [documento, nombre, email, telefono]);
        res.json(result.rows[0]);
    } catch(e){
        res.status(500).json({error: e.message})
    }
});

//Listar clientes
app.get("/clientes", async(req, res) => {
    try{
        const result = await pool.query("SELECT * FROM clientes;");
        res.json(result.rows);
    }catch (e) {
        res.status(500).json({error: e.message})
    }
})

//Eliminar clientes
app.delete("/clientes/:documento", async (req, res) => {
    try{
        const { documento } = req.params;
        await pool.query("DELETE FROM clientes WHERE documento = $1", [documento]);
        res.json({succes: true, message: "Cliente eliminado"})
    } catch(e){
        res.status(500).json({ success: false, message: "Error"});
    }
})

app.put('/clientes/:doc', async(req, res) => {
    try{
        const { doc } = req.params;
        const { documento, nombre, email, telefono} = req.body;

        const existe = await pool.query(
            "SELECT 1 FROM clientes WHERE documento = $1", [doc]
        )
        if(existe.rowCount > 0 && documento !== doc){
            return res.status(409).json({success: false, message: "El documento ya existe"})
        }


        await pool.query(
            "UPDATE clientes SET documento = $1, nombre = $2, email = $3, telefono = $4 WHERE documento = $5 RETURNING *", [documento, nombre, email, telefono, doc]);
        
        res.json({success: true, message: "Cliente actualizado"})
            
    }catch(e){
        res.status(500).json({success: false, message: "Error en la modificacion"})
    }
})

//Listar usuarios
app.get("/usuarios", async(req, res) => {
    try{
        const result = await pool.query(
            "SELECT usuarios.usuario, usuarios.clave, usuarios.nombre, roles.nombre_rol AS rol FROM usuarios INNER JOIN roles ON roles.rol = usuarios.rol;");
        res.json(result.rows);
    }catch (e) {
        res.status(500).json({error: e.message})
    }
})

//Agregar usuarios
app.post("/usuarios", async (req, res) => {
    const {usuario, clave, nombre, rol} = req.body;
    try{
        const result = await pool.query(
            "INSERT INTO usuarios (usuario, clave, nombre, rol) VALUES ($1, $2, $3, $4) RETURNING *", [usuario, clave, nombre, rol]);
        res.json(result.rows[0]);
    } catch(e){
        res.status(500).json({error: e.message})
    }
});

pool.connect()
    .then(() => console.log("✅ Conexión exitosa con PostgreSQL"))
    .catch(err => console.error("❌ Error al conectar con PostgreSQL:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});

//Eliminar usuario
app.delete("/usuarios/:usuario", async (req, res) => {
    try{
        const { usuario } = req.params;
        await pool.query("DELETE FROM usuarios WHERE usuario = $1", [usuario]);
        res.json({succes: true, message: "Usuario eliminado"})
    } catch(e){
        res.status(500).json({ success: false, message: "Error"});
    }
})