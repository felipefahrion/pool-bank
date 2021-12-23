const Pauta = require("../models/Pauta");
const PautaRepository = require("../repository/PautaRepository");

class PautaService{
    constructor(){
        this.pautaRepository = new PautaRepository()
        this.pautas = this.pautaRepository.pautas
    }

    getPautas(){
        return this.pautas
    }

    getPautaById(idPauta){
        const pauta = this.pautas.find(pauta => pauta.idPauta === idPauta)
        console.log(pauta);
        if(pauta){
            return pauta
        }
        throw new Error("Pauta não cadastrada!")
    }
    
    getPautaIndex(idPauta){
        return this.pautas.findIndex(pauta => pauta.idPauta === idPauta)
    }
    
    isValidPauta(idPauta){
        const pauta = this.getPautaById(idPauta)
        if(pauta && pauta.status === 'open') 
            return true 
        throw new Error('Pauta já encerrada ou não encontrada!')
    }

    createNewPauta(descricao, tempoCriacao, tempoFim ){
        const novaPauta = new Pauta(
            descricao,
            tempoCriacao,
            tempoFim,
        )
        this.pautas.push(novaPauta)

        return novaPauta
    }
}

module.exports = PautaService