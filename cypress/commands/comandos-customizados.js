// comandos-customizados.js
Cypress.Commands.add('preencherCamposObrigatorios', () => {
    cy.get('#firstName').type('eduardo');
    cy.get('#lastName').type('moura');
    cy.get('#email').type('teste@test.com');
    cy.get('#open-text-area').type('loremypsulumlorenypysuluml');
});

Cypress.Commands.add('limparCampos', () => {
    cy.get('#firstName').clear();
    cy.get('#lastName').clear();
    cy.get('#email').clear();
    cy.get('#phone').clear();
    cy.get('#open-text-area').clear();
});

Cypress.Commands.add('verificarErroVisivel', () => {
    cy.get('.error').should('be.visible');
});
