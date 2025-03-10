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

//Modificar clientes
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

//Modificar usuarios
app.put('/usuarios/:user', async(req, res) => {
    try{
        const { user } = req.params;
        const { usuario, clave, nombre, rol } = req.body;

        const existe = await pool.query(
            "SELECT 1 FROM usuarios WHERE usuario = $1", [user]
        )
        if(existe.rowCount > 0 && usuario !== user){
            return res.status(409).json({success: false, message: "El documento ya existe"})
        }


        await pool.query(
            "UPDATE usuarios SET usuario = $1, clave = $2, nombre = $3, rol = $4 WHERE usuario = $5 RETURNING *", [usuario, clave, nombre, rol, user]);
        
        res.json({success: true, message: "Cliente actualizado"})
            
    }catch(e){
        res.status(500).json({success: false, message: "Error en la modificacion"})
    }


});

// Autenticación de usuarios
app.post("/login", async (req, res) => {
    const { usuario, clave } = req.body;

    try {
        const result = await pool.query("SELECT * FROM usuarios WHERE usuario = $1", [usuario]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        const user = result.rows[0];

        if (user.clave !== clave) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        res.json({ message: "Login exitoso", token:true, rol:user.rol, nombre: user.nombre });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
});

//Agregar venta
app.post("/venta", async (req, res) => {
    const {fecha, vendedor, cliente, total, metodo} = req.body;
    try{
        const result = await pool.query(
            "INSERT INTO  historial_ventas (fecha, vendedor, cliente, total, metodo) VALUES ($1, $2, $3, $4, $5) RETURNING *", [fecha, vendedor, cliente, total, metodo]);
        res.json(result.rows[0]);
    } catch(e){
        res.status(500).json({error: e.message})
    }
});

//listar historial
app.get("/ventas", async(req, res) => {
    try{
        const result = await pool.query(
            "SELECT factura, fecha, vendedor, cliente, total::numeric, metodo FROM historial_ventas");
        res.json(result.rows);
    }catch (e) {
        res.status(500).json({error: e.message})
    }
})

//filtrar cliente
app.get("/buscarcliente/:documento", async(req, res) => {
    try{
        const {documento} = req.params;
        const resultado = await pool.query("SELECT documento FROM clientes WHERE documento = $1", [documento]);
        if (resultado.rows.length > 0) {
            res.json({ existe: true, cliente: resultado.rows[0] });
        } else {
            res.json({ existe: false, mensaje: "Venta no encontrada" });
        }
    }catch(e){
        console.error("Error al buscar la venta:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
})


pool.connect()
    .then(() => console.log("✅ Conexión exitosa con PostgreSQL"))
    .catch(err => console.error("❌ Error al conectar con PostgreSQL:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
})