const express = require("express")
const routes = express.Router()
const dresssalesControllers = require("../controllers/dresssalesControllers")

routes.get('/', dresssalesControllers.getAll)
routes.get('/:id', dresssalesControllers.getOne)
routes.get('/option/:input', dresssalesControllers.getByOption)
routes.post('/', dresssalesControllers.create)

module.exports = routes