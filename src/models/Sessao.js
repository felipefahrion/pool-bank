const uuid = require('uuid');

class Sessao {
    constructor(idPauta, duracao = 1){
        this.idSessao = uuid.v4(),
        this.idPauta = idPauta,
        this.duracao = Date.now() + (60000 * duracao)
    }
}

module.exports = Sessao