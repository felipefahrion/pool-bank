const ApiRoutes = {
    HEALTH: '/health',
    START_VOTING: '/voting',
    GET_PAUTAS: '/pautas',
    GET_PAUTA_BY_ID: '/pauta/:idPauta',
    CREATE_PAUTA: '/pauta',
    VOTE_ON_PAUTA: '/pauta',
    SESSAO_PAUTA_RESULTS: '/sessao/:idSessao/pauta/:idPauta/results',
    START_SESSAO: '/sessao/pauta/:idPauta',
    GET_SESSOES: '/sessoes'
}

module.exports = ApiRoutes