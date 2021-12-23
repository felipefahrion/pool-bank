const uuid = require('uuid');
const ApiRoutes = require('../routes')
const PautaService = require("../service/PautaService")
const VotoService = require("../service/VotoService");
const SessaoService = require("../service/SessaoService");

const pautaService = new PautaService()
const votoService = new VotoService(pautaService)
const sessaoService = new SessaoService(pautaService)

module.exports = function(app) {
    app.get('/health', function (req, res) {
        res.send(`Health check`)
    })
    
    app.post('/pauta', function (req, res) {
        const { descricao, tempoCriacao, tempoFim } = req.body
    
        const novaPauta = pautaService.createNewPauta(descricao, tempoCriacao, tempoFim)
        res.json(novaPauta)
    })
    
    app.get('/pautas', function (req, res) {  
        res.json(pautaService.getPautas())
    })
    
    app.get('/pauta/:idPauta', function (req, res) {  
        const { idPauta } = req.params
    
        try {
            const pautaById = pautaService.getPautaById(idPauta)
            res.json(pautaById)
        } catch (e) {
            res.status(200).json(e.message)
        }
    })
    
    app.put('/pauta', function (req, res) {
        const { idPauta, idCooperado, voto } = req.body
        
        try {
            votoService.vote(idPauta, idCooperado, voto)
            
            res.status(200).json("Voto realizado com sucesso!")
        } catch (e) {
            res.status(200).json(e.message)
        }
    })
    
    app.get('/sessao/:idSessao/pauta/:idPauta/results', function (req, res) {  
        const { idPauta, idSessao } = req.params
    
        const result = sessaoService.calculateResults(idSessao,idPauta)
    
        res.json(result)
    })
    
    app.post('/sessao/pauta/:idPauta', function (req, res) {  
        const { idPauta } = req.params
        const { duracao } = req.body
    
        try {
            const sessao = sessaoService.startSessao(idPauta, duracao)
            res.json(sessao)
        } catch (e) {
            res.status(200).json(e.message)   
        }
    })
    
    app.get('/sessoes', function (req, res) {  
        const sessao = sessaoService.getSessoes()
        res.json(sessao)
    })
}