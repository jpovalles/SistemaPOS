require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const nodemailer = require("nodemailer");


const app = express();

app.use(cors());
app.use(express.json());



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jpovallesceron@gmail.com", // Tu correo de Gmail
      pass: process.env.GMAIL_PASS, // Usa la contraseña de aplicación
    },
});

app.post('/enviar-mail', async (req, res) =>{
    try {
        const { to, subject, html } = req.body;
        // Configurar el correo
        const mailOptions = {
            from: "jpovallesceron@gmail.com",
            to: to,
            subject: subject,
            html: html,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error al enviar el correo:", error);
            } else {
                console.log("Correo enviado con éxito:", info.response);
            }
        });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

/*
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});
*/

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
})

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

        res.json({ message: "Login exitoso", token:true, rol:user.rol, nombre: user.nombre, username: user.usuario});

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
});


// Listar inventario
app.get("/inventario", async (req, res) => {
    try{
        const result = await pool.query("SELECT * FROM inventario;");
        res.json(result.rows);
    }catch (e) {
        res.status(500).json({error: e.message})
    }
})

// Agregar producto al inventario
app.post("/inventario", async (req, res) => {
    const {nombreProducto, Precio, Cantidad} = req.body;
    try{
        const result = await pool.query(
            `INSERT INTO inventario ("nombreProducto", "Precio", "Cantidad") VALUES ($1, $2, $3) RETURNING *`, [nombreProducto, Precio, Cantidad]);
            res.json(result.rows[0]);
        } catch(e){
            res.status(500).json({error: e.message})
        }
    });

// Eliminar producto del inventario
app.delete("/inventario/:idProducto", async (req, res) => {
    try{
        const { idProducto } = req.params;
        await pool.query(`DELETE FROM "inventario" WHERE "idProducto" = ${idProducto}`);
        res.json({succes: true, message: "Producto eliminado"})
    } catch(e){
        res.status(500).json({ success: false, message: "Error"});
    }
})

// Actualizar producto del inventario
app.put('/inventario/:idProducto', async(req, res) => {
    try{
        const { idProducto } = req.params;
        const { nombre, precio, cantidad } = req.body;

        await pool.query(
            `UPDATE "inventario" SET "nombreProducto" = $2, "Cantidad" = $3, "Precio" = $4 WHERE "idProducto" = $1 RETURNING *`, [idProducto, nombre, cantidad, precio]);
        
        res.json({success: true, message: "Producto actualizado"})
            
    }catch(e){
        res.status(500).json({success: false, message: "Error en la modificacion"})
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
        const resultado = await pool.query("SELECT * FROM clientes WHERE documento = $1", [documento]);
        if (resultado.rows.length > 0) {
            console.log(resultado.rows[0])
            res.json({ existe: true, cliente: resultado.rows[0] });
        } else {
            res.json({ existe: false, mensaje: "Cliente no encontrado" });
        }
    }catch(e){
        console.error("Error al buscar el cliente:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
})


// buscar producto
app.get("/producto/:codigo", async (req, res) => {
    const { codigo } = req.params;

    try {
        const result = await pool.query(`SELECT * FROM "inventario" WHERE "idProducto" = $1`, [codigo]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(result.rows[0]); // Retorna el producto si existe
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
});

// actualizar inventario
app.put("/actualizar-inventario", async (req, res) => {
    const { productos } = req.body;

    try {
        await pool.query("BEGIN"); // Iniciar transacción

        for (const producto of productos) {
            const { codigo, cantidad, nombre } = producto;
            
            // Verificar el stock actual
            const stockResult = await pool.query(
                `SELECT "Cantidad" FROM "inventario" WHERE "idProducto" = $1`,
                [codigo]
            );

            if (stockResult.rows.length === 0) {
                await pool.query("ROLLBACK");
                return res.status(404).json({ success: false, message: `Producto ${nombre} no encontrado` });
            }

            const stockDisponible = stockResult.rows[0].Cantidad;
            console.log(stockDisponible)
            console.log(cantidad)

            if (stockDisponible < cantidad) {
                await pool.query("ROLLBACK");
                return res.status(400).json({ 
                    success: false, 
                    message: `Stock insuficiente para el producto ${codigo} - ${nombre}. Disponible: ${stockDisponible}, Requerido: ${cantidad}` 
                });
            }

            // Restar la cantidad del stock
            await pool.query(
                `UPDATE "inventario" SET "Cantidad" = "Cantidad" - $1 WHERE "idProducto" = $2`,
                [cantidad, codigo]
            );
        }

        await pool.query("COMMIT"); // Confirmar cambios en la BD
        res.json({ success: true, message: "Inventario actualizado correctamente" });

    } catch (error) {
        await pool.query("ROLLBACK");
        res.status(500).json({ success: false, message: "Error al actualizar el inventario", error });
    }
});



pool.connect()
    .then(() => console.log("✅ Conexión exitosa con PostgreSQL"))
    .catch(err => console.error("❌ Error al conectar con PostgreSQL:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
})