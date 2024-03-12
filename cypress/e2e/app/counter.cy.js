import React from "react";

<reference types="cypress" />
describe('Counter App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays two buttons + and - and an initial value as 1', () => {
    cy.get('#incButton').should('exist')
    cy.get('#decButton').should('exist')
    cy.get('#counterSpan').should('exist').should('have.text', '1')
  })

  it('clicking on the + button increses the value to 2', () => {
    cy.get('#incButton').click()
    cy.get('#counterSpan').should('exist').should('have.text', '2')
  })

  it('clicking on the - button increses the value to 0', () => {
    cy.get('#decButton').click()
    cy.get('#counterSpan').should('exist').should('have.text', '0')
  })
})
