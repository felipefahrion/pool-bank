const app = require("../index")
const request = require("supertest");
const uuid = require('uuid');

jest.mock('uuid');

describe("Pauta API", () => {
    it("should create a new pauta", async () => {
        jest.spyOn(uuid, 'v4').mockImplementation(() => '001');

        const response = await request(app)
            .post("/pauta")
            .send({
                descricao: "trocar cor sicredi", 
                tempoCriacao: "21/12/2021", 
                tempoFim : "22/01/2022"
            })

        expect(response.status).toBe(200)
        expect(response.body).toMatchObject({
            idPauta: "001",
            descricao: "trocar cor sicredi",
            tempoCriacao: "21/12/2021",
            tempoFim: "22/01/2022",
            status: "open",
            votos: []
        });
    });
})  