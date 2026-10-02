const express = require('express') //constante express que vamos a requerir
const routes = express.Router()
//Importamos el archivo de lógica
const userstypesControllers = require('../controllers/userstypesControllers')

routes.get('/', userstypesControllers.getAll)
routes.delete('/:id', userstypesControllers.delete)
routes.post('/', userstypesControllers.create)
routes.put('/:input', userstypesControllers.edit)

module.exports = routes
