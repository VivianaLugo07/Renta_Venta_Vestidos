const express = require("express") //importamos express

// Obtener todos los vestidos a la venta
const getAll = (req, res) => { 
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(
            `SELECT * FROM ventavestidos`,
            (err, rows) => {
                if (err) return res.send(err)

                res.json(rows)
            }
        )
    })
}


// Buscar por ID (conseguimos uno)
const getOne = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(
            //indicamos que seleccionamos toda la informacion de la tabla ventavestidos donde el id sea....
            `SELECT * FROM ventavestidos WHERE IDVentaVestido = ?`,
            //EL signo se reemplaza aquí y en request.http
            [req.params.id],
            (err, rows) => {
                if (err) return res.send(err)

                //si no encontró nada con ese id será 0
                if (rows.length === 0) {
                    return res.status(404).json({
                        error: "Venta no encontrada"
                    })
                }
                res.json(rows)
            }
        )
    })
}


// Búsqueda por opciones
const getByOption = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(
            // los ?? dicen que vamos a reemplazar el nombre de la columna
            `SELECT * FROM ventavestidos WHERE ?? = TRUE`,
            [req.params.input],
            (err, rows) => {
                if (err) return res.send(err)

                res.json(rows)
            }
        )
    })
}


// Crear venta
const create = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(
            `INSERT INTO ventavestidos SET ?`,
            [req.body],
            (err, rows) => {

                if (err) {
                    // Error por llave foránea inexistente porque no exista o no fue encontrada
                    if (err.errno === 1452) {
                        return res.status(400).json({
                            error: "No se puede registrar la venta",
                            mensaje: "Una de las llaves foráneas no existe."
                        })
                    }

                    return res.send(err)
                }

                res.status(201).json({
                    mensaje: "Vestido en venta agregado",
                    id: rows.insertId
                })
            }
        )
    })
}


module.exports = {
    getAll,
    getOne,
    getByOption,
    create
}