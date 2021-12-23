class PautaRepository {
    constructor(){
        this.pautas = [{
            idPauta: "1",
            descricao: 'TESTE',
            tempoCriacao: "21/12/2021",
            tempoFim: "22/12/2021",
            status: 'open',
            votos: []
        }]
    }
}

module.exports = PautaRepository