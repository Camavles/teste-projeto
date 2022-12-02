// schema do mongoose


const mongoose = require("mongoose")

// orientação a objetos.
const pacienteSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    plano_saude: {
        type: String,
        required: false
    },
    plano_saude_numero: {
        type: Number,
        required: true
    }
}, { timestamps: true})







// no primeiro parametro, ele cria, e no segundo ele adiciona/atribui.
module.exports = mongoose.model("paciente", pacienteSchema)