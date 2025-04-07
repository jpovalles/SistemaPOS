# **SistemaPOS**

Este repositorio contiene el desarrollo de un **sistema POS (Point of Sale)** diseñado para registrar y gestionar ventas de manera eficiente, almacenar la información en una base de datos y generar reportes.

## **Características**

El sistema cuenta con las siguientes funcionalidades, desarrolladas en base a las historias de usuario definidas en los sprints del proyecto:

### **Sprint 1**

✔️ **Autenticación de usuario:** Inicio de sesión con usuario y contraseña.\
✔️ **Gestión de roles:** Asignación de roles de vendedor o administrador.\
✔️ **Búsqueda manual de productos:** Posibilidad de buscar productos ingresando el código.\
✔️ **Registro de clientes:** Permite registrar datos de clientes en el sistema.\
✔️ **Modificación de lista de productos en una venta:** Agregar, eliminar o modificar productos antes de facturar.\
✔️ **Bloqueo de inicio de sesión:** El sistema bloquea la cuenta tras varios intentos fallidos.

### **Sprint 2**

✔️ **Generación de reportes de ventas:** Detalle de ventas con filtros y exportación de datos.\
✔️ **Gestión de inventario:** Buscar y agregar productos con nombre, precio y cantidad.\
✔️ **Registro de ventas en la base de datos:** Guarda la información de cada transacción.\
✔️ **Gestión de clientes registrados:** Permite visualizar, editar y eliminar clientes.\
✔️ **Filtrado de reportes de ventas:** Reportes específicos por vendedor, rango de fechas, entre otros.\
✔️ **Selección de método de pago:** Pago en efectivo o tarjeta con cálculo de cambio.\
✔️ **Envío de factura por correo electrónico:** Factura digital enviada automáticamente tras la compra.

## **Tecnologías utilizadas**

- **Frontend:** React
- **Backend:** Node.js, express, nodemailer
- **Base de datos:** PostgreSQL

## **Requisitos previos**

- **Node.js** (versión 14 o superior)
- **npm** (versión 6 o superior)

## **Instalación**

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/jpovalles/SistemaPOS.git
   ```

## Despliegue
* [Sistema POS (railway)](https://sistemapos-production.up.railway.app)
* [Sistema POS (Vercel)](https://sistema-pos-phi.vercel.app)
