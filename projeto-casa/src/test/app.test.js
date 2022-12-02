const app = require("../app")
const request = require("supertest")
const model = require("../models/PacienteSchema")
// const jwt = require("jsonwebtoken")
// const SECRET = process.env.SECRET

describe("Paciente Controller", () => {

    // const token = "bearer"+jwt.sign({name: "camila"}, SECRET)

    const pacienteMock = {
        nome: "Aka",
        telefone: "233640",
        endereco: "lua verde",
        plano_saude: true,
        plano_saude_numero: 6554

        // só preciso colocar uma token para fazer um test de autenticação
    }

    beforeAll(async() => {
        const novaPaciente = new model(pacienteMock)

        await novaPaciente.save()

        pacienteMock.id = novaPaciente._id

    })


    afterAll(async() => {
        await model.deleteMany()
    })

    test("GET /pacientes/buscar", (done) => {

        request(app)
        .get("/pacientes/buscar")
        // .set("authorization", token)
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Paciente encontrada!")
        })
        .end(err => {
            if (err) return done(err)
            return done()
        })
        

    });


    test("POST /pacientes/criar", (done) => {

        const novaPaciente = {
            nome: "Bruna",
            telefone: "4556-1963",
            endereco: "Rua Nova",
            plano_saude: true,
            plano_saude_numero: 55664
        }


        request(app)
        .post("/pacientes/criar")
        .send(novaPaciente)
        .expect(201)
        .expect(res => {
            expect(res.body.paciente.nome).toBe("Bruna")
        })
        .end(err => {
            return done(err)
        })
    });


    test("PATCH /pacientes/atualizar/:id", (done) => {

        const atualizarPaciente = {
            nome: "Luiza"
        }

        request(app)
        .patch("/pacientes/atualizar/" + pacienteMock.id)
        .send(atualizarPaciente)
        // .set("authorization", token)
        .set("Accept", "application/json")
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Paciente atualizada com sucesso!")
            expect(res.body.paciente.nome).toBe("Luiza")
        })
        .end(err => done(err))
    });


    test('GET /pacientes/buscar/:id ', (done) => {
        request(app)
        .get(`/pacientes/buscar/${pacienteMock.id}`)
        // .set("authorization", token)
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Paciente encontrada")
        })
        .end(err => done(err))
    });


    test("DELETE /pacientes/deletar/:id", (done) => {
        request(app)
        .delete("/pacientes/deletar/" + pacienteMock.id)
        // .set("authorization", token)
        .expect(200)
        .end(err => done(err))
        
    });


    test('Deve retornar um erro ao não encontrar uma paciente e um statusCode 404', (done) => {
        let idFake = "638114f070de5e77ffacdf86"
        request(app)
        .get("/pacientes/buscar/" + idFake)
        .expect(404)
        .expect(res => {
            expect(res.body.message).toBe("Paciente não encontrada!")
        })
        .end(err => done(err))
    });


});