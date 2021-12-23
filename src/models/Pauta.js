const uuid = require('uuid');

class Pauta {
    constructor(descricao, tempoCriacao, tempoFim){
        this.idPauta = uuid.v4(),
        this.descricao = descricao,
        this.tempoCriacao = tempoCriacao,
        this.tempoFim = tempoFim,
        this.status = 'open',
        this.votos = []
    }
}

module.exports = Pauta