const Voto = require("../models/Voto");
const axios = require('axios');

class VotoService{
    constructor(pautaService){
        this.pautaService = pautaService
    }

    canCooperadoVoteInPauta(idCooperado, votes){
        if(votes.findIndex(vote => vote.idCooperado === idCooperado) === -1)
            return true
        throw new Error("Cooperado já votou!")
    }

    vote(idPauta, idCooperado, voto){
        const pautaIndex = this.pautaService.getPautaIndex(idPauta)
        const pauta = this.pautaService.getPautaById(idPauta)

        if(this.pautaService.isValidPauta(idPauta) && 
        this.canCooperadoVoteInPauta(idCooperado, pauta.votos)){
            const newVote = new Voto(
                idPauta,
                idCooperado,
                voto
            )

            let votosNovos = this.pautaService.getPautas()[pautaIndex].votos
            votosNovos.push(newVote)
    
            this.pautaService.getPautas()[pautaIndex] = { ...this.pautaService.getPautas()[pautaIndex], votos: votosNovos}
        }
    }
}

module.exports = VotoService