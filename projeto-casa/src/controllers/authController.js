const UserSchema = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET


const login = (request, response) => {

    try {
        UserSchema.findOne({ email: request.body.email}, (error, user) => {
            if(!user) {
                return response.status(404).send({
                    message: "Usuário não encontrado",
                    email: `${request.body.email}`
                })
            }

            const validPassword = bcrypt.compareSync(request.body.password, user.password)

            if(!validPassword) {
                return response.status(401).send({
                    message: "Senha inválida!",
                    statusCode: 401
                })
            }

            const token = jwt.sign({ name: user.name}, SECRET)

            response.status(200).send({
                message: "Login realizado com sucesso!",
                token
            })
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    login
}