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
            `UPDATE FROM tiposusuarios set ? WHERE id = ?`,
            [req.body, req.params.id], (err, rows) => {
                if (err) return res.send(err)

                res.send('Tipo de usuario actualizado')
            })
    })
}

// //    ELIMINAAAR   -----------------
// routes.delete('/:criterio', (req, res) => {
//     req.getConnection((err, conn) => {
//         if (err) return res.send(err)
//         conn.query(`DELETE FROM tiposusuarios WHERE id = ? OR nombre =?`, req.params.criterio, (err, rows) => {
//             if(err) return res.send(err)
//             res.send('Tipo de usuario eliminado')
//         })
//     })
// })

module.exports = {
    getAll,
    create,
    delete: eliminate,
    edit
}



