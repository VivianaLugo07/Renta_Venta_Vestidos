const express = require("express")

const getAll = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query(
            `SELECT * FROM horarios`,
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
            `INSERT INTO horarios set ?`,
            [req.body],
            (err, rows) => {
                if (err) return res.send(err)

                res.send("Horario insertado")
            }
        )
    })
}

const edit = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query(
            `UPDATE horarios SET ? WHERE idhorario = ?`,
            [req.body, req.params.id],
            (err, rows) => {
                if (err) return res.send(err)

                res.send("Horario editado")
            }
        )
    })
}

const eliminate = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query(
            `DELETE FROM horarios WHERE idhorario = ?`,
            [req.params.id],
            (err, rows) => {
                if (err) return res.send(err)

                res.send("Horario eliminado")
            }
        )
    })
}


module.exports = {
    getAll,
    create,
    edit,
    delete: eliminate
}