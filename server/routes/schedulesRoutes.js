const express= require("express")
const routes = express.Router()

const schedulesControllers= require('../controllers/schedulesControllers')

routes.get('/', schedulesControllers.getAll)
routes.post('/', schedulesControllers.create)
routes.put('/:id', schedulesControllers.edit)
routes.delete('/:id', schedulesControllers.delete)

module.exports = routes