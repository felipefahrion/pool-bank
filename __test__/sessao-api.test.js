const app = require("../index")
const request = require("supertest");
const uuid = require('uuid');

jest.mock('uuid');

describe("Sessao API", () => {
    it("should create a new sessao", async () => {
        jest.spyOn(uuid, 'v4').mockImplementation(() => '001');
        jest.spyOn(Date, 'now').mockImplementation(() => '1640360192954');

        // Date.now = jest.fn(() => 1640360192954)

        const pauta = await request(app)
        .post("/pauta")
        .send({
            descricao: "trocar cor sicredi", 
            tempoCriacao: "21/12/2021", 
            tempoFim : "22/01/2022"
        })

        const response = await request(app)
            .post(`/sessao/pauta/${pauta.body.idPauta}`)
            .send({
                duracao: "2"
            })

        expect(response.status).toBe(200)
        expect(response.body).toMatchObject(
            {
                idSessao: "001",
                idPauta: pauta.body.idPauta,
                duracao: "1640360192954120000"
            }
        );
    });

    it("should throw a message error", async () => {
        jest.spyOn(uuid, 'v4').mockImplementation(() => '001');

        const response = await request(app)
            .post("/sessao/pauta/pauta-id")
            .send({
                duracao: "2"
            })

        expect(response.status).toBe(200)
        expect(response.body).toMatchObject(
            {
                idSessao: "001",
                idPauta: "pauta-id",
                duracao: "1640360192954120000"
            }
        );
    });
})  