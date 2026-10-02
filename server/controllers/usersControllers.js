const express = require('express')

const getAll = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(
            `SELECT u.idusuario, u.nombre, u.apellido, u.numtelefono, u.tipousuario, u.curp, u.direccion
            FROM usuarios u
            INNER JOIN tiposusuarios t ON u.tipousuario = t.tipousuario`,
            (err, rows) => {
                if (err) return res.send(err)
                
                res.json(rows)
            }
        )
    })
}

const getOne = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(
            `SELECT idusuario, nombre, apellido, numtelefono, tipousuario, curp, direccion FROM usuarios
            WHERE (idusuario = ? OR nombre = ? OR apellido = ?)`,
            [req.params.input, req.params.input, req.params.input],
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
            `INSERT INTO usuarios SET ?`,
            [req.body],
            (err, rows) => {
                if (err) {
                    // Manejo específico de errores de clave duplicada
                    if (err.code === "ER_NO_REFERENCED_ROW_2") return res.status(400).send("El tipo de usuario no existe")
                
                    return res.send(err)
                }
               
                res.send("Usuario agregado")
            }
        )
    })
}

const eliminate = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        
        conn.query(
            `DELETE FROM usuarios WHERE idusuario = ?`,
            [req.params.id],
            (err, rows) => {
                if (err) return res.send(err)
                
                res.send("Usuario eliminado")
            }
        )
    })
}

const edit = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(
            `UPDATE usuarios SET ? WHERE idusuario = ?`,
            [req.body, req.params.id],
            (err, rows) => {
                if (err) {
                    if(err.code === "ER_NO_REFERENCED_ROW_2") return res.status(400).send("El tipo de usuario no existe")
                    return res.send(err)
                }
                res.send("Usuario actualizado")
            }
        )
    })
}

module.exports = {
    getAll,
    getOne,
    create,
    delete: eliminate,
    edit
}