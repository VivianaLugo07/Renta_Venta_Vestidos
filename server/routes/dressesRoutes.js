const express = require("express")
const routes = express.Router()
const dressesControllers = require("../controllers/dressesControllers")

routes.get("/", dressesControllers.getAll)
routes.get("/:input", dressesControllers.getOne)
routes.get("/option/:input", dressesControllers.getByOption)
routes.get("/rental/:id", dressesControllers.getByRental)
routes.get("/sale/:id", dressesControllers.getBySale)
routes.post("/", dressesControllers.create)
routes.put("/:id", dressesControllers.edit)
routes.delete("/:id", dressesControllers.delete)

module.exports = routes