# Banking Pool


## Executar o projeto
Executar as linhas abaixo em ordem: 
- `docker-compose up -d`
- `docker build -t pool .`
- `docker run --rm -d -p 8082:8082 -name pool pool`

## Usando a aplicação
Foi disponibilizado uma *collection* no qual é possível realizar o import dentro do Postman para realizar os testes. 
- Criar uma pauta
```
POST /pauta HTTP/1.1
Host: localhost:8082
Content-Type: application/json
Content-Length: 106

{
    "descricao": "nova pauta teste", 
    "tempoCriacao": "21/12/2021", 
    "tempoFim" : "21/12/2021"
}
```

- Criar uma sessão
```
POST /sessao/pauta/:idPauta HTTP/1.1
Host: localhost:8082
Content-Type: application/json
Content-Length: 22

{
    "duracao": "2"
}
```
- Votar
```
PUT /pauta HTTP/1.1
Host: localhost:8082
Content-Type: application/json
Content-Length: 68

{
    "idPauta": "1", 
    "idCooperado": "1", 
    "voto" : "Não"
}
```
- Calcular resultados
```
GET /sessao/:idSessao/pauta/idPauta/results HTTP/1.1
Host: localhost:8082
Content-Type: application/json
Content-Length: 83

{
    "idPauta": "nova pauta teste", 
    "idCooperado": "1", 
    "voto" : "SIM"
}
```

## Swagger
Para acessar a documentação Swagger do projeto, acessar a url: [localhost:8082/doc](localhost:8082/doc)

## Decisões 
- Utilização da biblioteca Express para ser o cliente da aplicação
- utilização da biblioteca `uuid` para criação de ids
- utilização de MongoBD
- 

## Questões Bônus
- Tarefa 1: inicialização da criação de um serviço que iria fazer a validação do CPF, `CPFValidatorService.js`. 
- Tarefa 2: não realizei 
- Tarefa 3: não realizei 
- Tarefa 4: uma das possibildades de versionamento da API é a utilziação de /v1, /v2 antes de acessar algum recurso. Essa maneira é possível utilizar novos serviços, realizar POCs, etc. 

## TODOS: 
- [ ] Terminar a implementação do BD
- [ ] Testes unitários das APIs
- [ ] Melhorar a documentação Swagger
- [ ] Colocar expections personalizadas nas chamadas de `Throw`
- [ ] Realizar a validação através do CPF
- [ ] Implementar a camada de mensageria 