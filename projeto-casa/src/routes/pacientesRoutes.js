const express = require("express")
const router = express.Router()
const controller = require("../controllers/pacienteController")
const userController = require("../controllers/userController")
const authController = require("../controllers/authController")

const { checkAuth } = require("../middlewares/auth")

//Rotas de pacientes
router.post("/criar", controller.criarPaciente)
router.get("/buscar", controller.buscarPaciente)
router.get("/buscar/:id", controller.buscarPacientePorId)
router.delete("/deletar/:id", controller.deletarPaciente)
router.patch("/atualizar/:id", controller.atualizarPaciente)


//Rotas para usuários
router.get("/users/buscar", checkAuth, userController.getAll)
router.post("/users/criar", userController.createUser)
router.post("/users/login", authController.login)

module.exports = router

