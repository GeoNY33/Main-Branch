describe('Are sites available', () => {
  it('vis', () => {
    cy.visit('http://localhost:8080/')
  })
  it('passes', () => {
    cy.visit('http://localhost:8080/#/signin')
  })
  it('passes', () => {
    cy.visit('http://localhost:8080/#/signup')
  })
  it('passes', () => {
    cy.visit('http://localhost:8080/#/main')
  })
})

describe(' ')