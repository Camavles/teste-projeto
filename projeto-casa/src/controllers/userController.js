const UserSchema = require("../models/userSchema")
const bcrypt = require("bcrypt")

const getAll = async (request, response) => {
    UserSchema.find(function (err, users) {
        if (err) {
            response.status(500).send({
                message: err.message
            })
        }
        response.status(200).send(users)
    })
}

const createUser = async (request, response) => {
    const hashedPassword = bcrypt.hashSync(request.body.password, 10)

    request.body.password = hashedPassword

    const emailExists = await UserSchema.exists({email: request.body.email})

    if (emailExists) {
        return response.status(409).send({
            message: "Email já cadastrado!"
        })
    }

    try {
        const newUser = new UserSchema(request.body)
        const savedUser = await newUser.save()

        response.status(201).send({
            message: "Usuária criada com sucesso!",
            savedUser
        })
    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }
}


module.exports = {
    getAll,
    createUser
}