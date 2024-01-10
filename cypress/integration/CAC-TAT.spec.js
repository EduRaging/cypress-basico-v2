
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })  
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it ('preenche os campos obrigatorios e envia o formulario', function() {
        cy.get('#firstName').type('eduardo ')
        cy.get('#lastName').type('moura')
        cy.get('#email').type('teste@test.com')
        cy.get('#open-text-area').type('loremypsulumlorenypysuluml')
        cy.contains('Enviar').click()
     
        cy.get('.success').should('be.visible')
    })    
    it('preencher o  campo texto com delay', function() {
        const textolongo = 'Lorem ipsum dolor sit amet. Est numquam aspernatur ut ipsum earum aut harum ipsam. Qui nihil rerum ut corrupti cumque 33 iusto molestiae ea dolores rerum sit similique autem. In quas tempore 33 corporis sint nam architecto numquam hic laudantium eligendi utdicta exercitationem. Vel quibusdam eaque sed nobis totam in odit incidunt sed minus voluptate'
        cy.get('#firstName').type('eduardo ')
        cy.get('#lastName').type('moura')
        cy.get('#email').type('teste@test.com')
        cy.get('#open-text-area').type(textolongo, { delay: 0 })
        cy.contains('Enviar').click()
     
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function() {
        cy.get('#firstName').type('eduardo ')
        cy.get('#lastName').type('moura')
        cy.get('#email').type('teste')
        cy.get('#phone')
        cy.get('#open-text-area').type('loremypsulumlorenypysuluml')
        cy.contains('Enviar').click()
     
        cy.get('.error').should('be.visible')

    })
    it('exibe mensagem de erro ao submeter o formulário com telefones alfanumericos',function() {
        cy.get('#firstName').type('eduardo ')
        cy.get('#lastName').type('moura')
        cy.get('#email').type('teste@test')
        cy.get('#phone').type('AAA')
        cy.get('#open-text-area').type('loremypsulumlorenypysuluml')
        cy.get('#phone').should('have.value','')
        
    })    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function() {
        cy.get('#firstName').type('eduardo ')
        cy.get('#lastName').type('moura')
        cy.get('#email').type('teste@test.com')
        cy.get('input[type="checkbox"][value="phone"]')
            .check()
        cy.get('#phone')
        cy.get('#open-text-area').type('loremypsulumlorenypysuluml')
        cy.contains('Enviar').click()
     
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function() {
        cy.get('#firstName')
            .type('Eduardo')
            .should('have.value','Eduardo')
            .clear().should('have.value', '')
        cy.get('#lastName')
            .type('Moura')
            .should('have.value', 'Moura')
            .clear().should('have.value', '')
        cy.get('#email').type('teste@test.com')
            .should('have.value', 'teste@test.com')
            .clear().should('have.value', '')
        cy.get('#phone')
            .type('11982662487')
            .should('have.value','11982662487')
            .clear()
            .should('have.value','')
        cy.get('#open-text-area')
            .type('loremypsulumlorenypysuluml')
            .should('have.value', 'loremypsulumlorenypysuluml')
            .clear()
            .should('have.value', '')

    
        
     
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function() {
        cy.contains('Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')

    })
    it('Testando a caixa de seleçao "YouTube ',function() {
        cy.get('select')
            .select('youtube')
        cy.get('#product')
            .should('have.value', 'youtube')
        
    })
    it('seleciona um produto (Mentoria) por seu valor (value)',function() {
        cy.get('select')
            .select('mentoria')
        cy.get('#product')
            .should('have.value', 'mentoria')
        
    })
    it('seleciona um produto (blog) por seu valor (value)',function() {
        cy.get('select')
            .select('blog')
        cy.get('#product')
            .should('have.value', 'blog')
        
    })
    it('marca o tipo de atendimento "Feedback',function() {
        cy.get('input[type="radio"][value= "feedback"]',)
            .check()
            .should('have.value', 'feedback')
                    
    })
    it('marca cada tipo de atendimento',function() {
        cy.get('input[type="radio"][value= "feedback"]',)
            .check()
            .should('be.checked')
        cy.get('input[type="radio"][value= "elogio"]',)
            .check()
            .should('be.checked')    
        cy.get('input[type="radio"][value= "ajuda"]',)
            .check()
            .should('be.checked')                
    })
    it('marca cada tipo de atendimento com wrap',function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
                          
    })
    it( 'marca ambos checkboxes, depois desmarca o último',function() {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
                          
    })
    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
     
                          
    })
    it('seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
     
                          
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function() {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
     

    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function() {
        cy.get('#privacy a').should('have.attr','target','_blank')
       
  
      })
    it('acessa a página da política de privacidade removendo o target e então clicando no link',function() {
        cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')

       
  
      })
    it('verifica o título da aplicação', function() {
        cy.visit('./src/privacy.html')
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

})