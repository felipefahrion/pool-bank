const SessaoRepository = require("../repository/SessaoRepository")
const Sessao = require("../models/Sessao")

class SessaoService{
    constructor(pautaService){
        this.pautaService = pautaService
        this.sessaoRepository = new SessaoRepository()
        this.sessoes = this.sessaoRepository.sessoes
        this.pautas = pautaService.pautas
    }

    startSessao(idPauta, duracao){
        if (this.hasOpenedSessao(idPauta)) {
            const newSessao = new Sessao(
                idPauta,
                duracao
            )
    
            this.sessoes.push(newSessao)
    
            return newSessao
        } 
    }

    hasOpenedSessao(idPauta){
        if(this.sessoes.findIndex(sessao => sessao.idPauta === idPauta) === -1 && this.pautaService.getPautaById(idPauta))
            return true
        throw new Error("Sessão com pauta já existente!")
    }

    getSessoes(){
        return this.sessoes.filter(sessao => sessao.duracao > Date.now())
    }


    calculateResults(idSessao, idPauta){
        const votesOnPauta = this.pautaService.getPautaById(idPauta).votos 

        const votosSim = votesOnPauta.filter(o => o.voto === "Sim")
        const votosNao = votesOnPauta.filter(o => o.voto === "Não")

        this.pautas[this.pautaService.getPautaIndex(idPauta)] = { ...this.pautas[this.pautaService.getPautaIndex(idPauta)], status: 'closed' }
        
        if(votosSim === votosNao) {
            return "EMPATE"
        } else if (votosNao > votosSim) {
            return "NÃO"
        } else {
            return "SIM"
        }
    }
}

module.exports = SessaoService
