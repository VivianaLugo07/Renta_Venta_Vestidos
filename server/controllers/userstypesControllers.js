const express = require('express') //constante express que vamos a requerir

const getAll = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(
            `SELECT * FROM tiposusuarios`,
            (err, rows) => {
                if (err) return res.send(err)

                res.json(rows)
            })
    })
}

const create = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query(
            `INSERT INTO tiposusuarios set ?`,
            [req.body],
            (err, rows) => {
                if (err) return res.send(err)

                res.send('Tipo de usuario agregado')
            })
    })
}
//    ELIMINAAAR   -----------------
const eliminate = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query(
            `DELETE FROM tiposusuarios WHERE tipousuario = ?`,
            req.params.id, (err, rows) => {
                if (err) return res.send(err)

                res.send('Tipo de usuario eliminado')
            })
    })
}

const edit = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query(
            `UPDATE tiposusuarios SET ? WHERE tipousuario = ?`,
            [req.body, req.params.input], (err, rows) => {
                if (err) return res.send(err)

                res.send('Tipo de usuario actualizado')
            })
    })
}

module.exports = {
    getAll,
    create,
    delete: eliminate,
    edit
}



