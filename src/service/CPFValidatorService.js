const axios = require('axios');

async function validateCPF(cpf) {
    const { data } = await axios.get(`/users/${cpf}`, {
        baseURL: 'https://user-info.herokuapp.com/',
    })

    return Promise.resolve(data.status === 'ABLE_TO_VOTE' ? true : false)
}

module.exports = validateCPF