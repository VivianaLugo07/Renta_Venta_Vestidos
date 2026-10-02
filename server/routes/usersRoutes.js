const express = require("express")
const routes = express.Router()
const usersControllers = require("../controllers/usersControllers")

routes.get('/', usersControllers.getAll)
routes.get('/:input', usersControllers.getOne)
routes.post('/', usersControllers.create)
routes.delete('/:id', usersControllers.delete)
routes.put('/:id', usersControllers.edit)

module.exports = routes