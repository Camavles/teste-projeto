require("dotenv").config()

const express = require("express")
const cors = require("cors")
const app = express()

const database = require("./database/mongoConfig")

const pacienteRoutes = require("./routes/pacientesRoutes")

app.use(cors())
app.use(express.json())

// esse app use /rota é minha primeira rota, mas ainda não é meu recurso. 
app.use("/pacientes", pacienteRoutes)

database.connect()

module.exports = app
