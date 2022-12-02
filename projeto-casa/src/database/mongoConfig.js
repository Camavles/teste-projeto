const mongoose = require("mongoose")

const uri = process.env.MONGODB_URI



const connect = async() => {
    try {
        await mongoose.connect(uri, {
            // conseguir identificar os endpoints
            useNewUrlParser: true,
            // verificar monitoramento,
            useUnifiedTopology: true,
        })
        console.log("Banco de dados conectado!")

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    connect
}
