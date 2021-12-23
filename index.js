const cors = require("cors")
const uuid = require('uuid');
const express = require('express')
const ApiRoutes = require('./src/routes')

const PautaService = require("./src/service/PautaService")
const VotoService = require("./src/service/VotoService");
const SessaoService = require("./src/service/SessaoService");

const app = express()
const port = 8082;

app.use(express.json());
app.use(cors());

app.listen(port, function() {
    console.log("Starting the app...");
})

function logRequests(req, res, next) {
    const { method, url, params} = req

    const logLabel = `[${method.toUpperCase()}] ${url}`
    console.time(logLabel)

    next()

    console.timeEnd(logLabel)
}

app.use(logRequests)

const pautaService = new PautaService()
const votoService = new VotoService(pautaService)
const sessaoService = new SessaoService(pautaService)

app.get(ApiRoutes.HEALTH, function (req, res) {
    res.send(`Health check on PORT: ${port}`)
})

app.post(ApiRoutes.CREATE_PAUTA, function (req, res) {
    const { descricao, tempoCriacao, tempoFim } = req.body

    const novaPauta = pautaService.createNewPauta(descricao, tempoCriacao, tempoFim)
  
    res.json(novaPauta)
})

app.get(ApiRoutes.GET_PAUTAS, function (req, res) {  
    res.json(pautaService.getPautas())
})

app.get(ApiRoutes.GET_PAUTA_BY_ID, function (req, res) {  
    const { idPauta } = req.params

    try {
        const pautaById = pautaService.getPautaById(idPauta)
        res.json(pautaById)
    } catch (e) {
        console.log(e);
        res.status(200).json(e.message)
    }
})

app.put(ApiRoutes.VOTE_ON_PAUTA, function (req, res) {
    const { idPauta, idCooperado, voto } = req.body
    
    try {
        votoService.vote(idPauta, idCooperado, voto)
        
        res.status(200).json("Voto realizado com sucesso!")
    } catch (e) {
        console.log(e);
        res.status(200).json(e.message)
    }
})

app.get(ApiRoutes.SESSAO_PAUTA_RESULTS, function (req, res) {  
    const { idPauta, idSessao } = req.params

    const result = sessaoService.calculateResults(idSessao,idPauta)

    res.json(result)
})

app.post(ApiRoutes.START_SESSAO, function (req, res) {  
    const { idPauta } = req.params
    const { duracao } = req.body

    try {
        const sessao = sessaoService.startSessao(idPauta, duracao)
        res.json(sessao)
    } catch (e) {
        console.log(e);
        res.status(200).json(e.message)   
    }
})

app.get(ApiRoutes.GET_SESSOES, function (req, res) {  
    const sessao = sessaoService.getSessoes()
    res.json(sessao)
})



//iniciar sessao 
//contagem do tempo da sessao de voto
// criar as exceptions
// colocar um logger na aplicacao


module.exports = app