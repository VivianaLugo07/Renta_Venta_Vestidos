const express = require("express")

const getAll = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(
            `SELECT * FROM vestidos`,
            (err, rows) => {
                if (err) return res.send(err)

                res.json(rows)
            }
        )
    })
}

// Buscar por nombre
const getOne = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        
        conn.query(
            `SELECT * FROM vestidos WHERE LOWER(nombrevestido) LIKE LOWER(?)`,
            [`%${req.params.input}%`],
            (err, rows) => {
                if (err) return res.send(err)
                
                res.json(rows)
            }
        )
    })
}

// Buscar por opciones (venta o renta)
const getByOption = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        
        conn.query(
            `SELECT * FROM vestidos WHERE ?? = TRUE`,  // ?? se refiere a él como un identificador de columna
            [req.params.input],
            (err, rows) => {
                if (err) return res.send(err)
                
                res.json(rows)
            }
        )
    })
}

// Pantalla de Renta de un vestido
const getByRental = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        
        conn.query(
            `SELECT idvestido, talla, urlimagen, nombrevestido, costorenta FROM vestidos WHERE idvestido = ?`,
            [req.params.id],
            (err, rows) => {
                if (err) return res.send(err)
                
                res.json(rows)
            }
        )
    })
}

// Pantalla de Venta de un vestido
const getBySale = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        
        conn.query(
            `SELECT idvestido, talla, urlimagen, nombrevestido, costoventa FROM vestidos WHERE idvestido = ?`,
            [req.params.id],
            (err, rows) => {
                if (err) return res.send(err)
                
                res.json(rows)
            }
        )
    })
}

const create = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(
            `INSERT INTO vestidos SET ?`,
            [req.body],
            (err, rows) => {
                if (err) return res.send(err)
                
                res.send("Vestido agregado")
            }
        )
    })
}

const eliminate = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        
        conn.query(
            `DELETE FROM vestidos WHERE idvestido = ?`,
            [req.params.id],
            (err, rows) => {
                if (err) return res.send(err)

                res.send("Vestido eliminado")
            }
        )
    })
}

const edit = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(
            `UPDATE vestidos SET ? WHERE idvestido = ?`,
            [req.body, req.params.id],
            (err, rows) => {
                if (err) return res.send(err)

                res.send("Vestido actualizado")
            }
        )
    })
}

module.exports = {
    getAll,
    getOne,
    getByOption,
    getByRental,
    getBySale,
    create,
    delete: eliminate,
    edit
}