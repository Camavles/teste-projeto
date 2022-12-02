const PacienteSchema = require("../models/PacienteSchema")

const criarPaciente = async (request, response) => {
    const { nome, telefone, endereco, plano_saude, plano_saude_numero } = request.body

    if (!endereco) {
        return response.status(400).send({
            message: "Endereço não foi preenchido!"
        })
    }

    try {

        const paciente = new PacienteSchema({
            nome: nome,
            telefone: telefone,
            endereco: endereco,
            plano_saude: plano_saude,
            plano_saude_numero: plano_saude_numero
        })


        const salvarPaciente = await paciente.save()

        response.status(201).json({
            paciente: salvarPaciente
        })

    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }


}

const buscarPaciente = async (request, response) => {
    const { nome } = request.query
    let query = {}

    //validação para caso venha um nome
    if (nome) query.nome = new RegExp(nome, 'i')

    try {
        const paciente = await PacienteSchema.find(query)

        response.status(200).send({
            message: "Paciente encontrada!",
            paciente
        })


    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}


const deletarPaciente = async (req, res) => {
    try {
        const buscarPacientePorId = await PacienteSchema.findById(req.params.id)

        if (!buscarPacientePorId) {
            return res.status(404).send({
                message: "Nenhum cadastro encontrado para o buscado"
            })
        }

        await buscarPacientePorId.delete()

        res.status(200).send({
            message: "Cadastro removido"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}


const atualizarPaciente = async (req, res) => {

    const { nome, telefone, endereco, plano_saude, plano_saude_numero } = req.body

    try {
        const encontraPorId = await PacienteSchema.findById(req.params.id)

        if (!encontraPorId) {
            return res.status(404).send({
                message: "Nenhum cadastro encontrado para o id buscado!"
            })
        }

        encontraPorId.nome = nome || encontraPorId.nome
        encontraPorId.telefone = telefone || encontraPorId.telefone
        encontraPorId.endereco = endereco || encontraPorId.endereco
        encontraPorId.plano_saude = plano_saude || encontraPorId.plano_saude
        encontraPorId.plano_saude_numero = plano_saude_numero || encontraPorId.plano_saude_numero

        const pacienteAtualizada = await encontraPorId.save()

        res.status(200).json({
            message: "Paciente atualizada com sucesso!",
            paciente: pacienteAtualizada
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }

}


const buscarPacientePorId = async (req, res) => {

    const id = req.params.id

    try {
        const buscarPaciente = await PacienteSchema.findById(id)

        if (!buscarPaciente) {
            return res.status(404).json({
                message: "Paciente não encontrada!"
            })
        }

        res.status(200).json({
            message: "Paciente encontrada",
            buscarPaciente})

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



module.exports = {
    criarPaciente,
    buscarPaciente,
    deletarPaciente,
    atualizarPaciente,
    buscarPacientePorId
}