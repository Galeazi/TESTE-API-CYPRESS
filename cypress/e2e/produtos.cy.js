/// <reference types="Cypress" />

describe('Testes da Funcionalidade Produtos', () => {
    let token 
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn})  
    });
    
    it('Listar Produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',
        }).then((response) => {
            expect(response.body.produtos[3].nome).to.equal('Iphone 14 Pro Max')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(15)

        })
    });

    it('Cadastrar Produto', () => {
        let produto = `produto da lojinha ${Math.floor(Math.random() * 10000000)}`
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: {
                "nome": produto,
                "preco": 500,
                "descricao": "Controle",
                "quantidade": 100
            },
            headers: {authorization: token} 
        }).then((response) =>{
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            expect(response.status).to.equal(201)
        })
    });

    it('Deve validar menssagem de erro ao cadastrar produto repetido', () => {
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: {
                "nome": produto,
                "preco": 500,
                "descricao": "Controle",
                "quantidade": 100
            },
            headers: {authorization: token} 
        }).then((response) =>{
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            expect(response.status).to.equal(201)
        })
    });

});