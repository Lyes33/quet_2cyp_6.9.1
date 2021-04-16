describe('Backmarket', () => {
  beforeEach(function(){
    cy.visit('https://preprod.backmarket.fr/')
    cy.url().should('eq', 'https://preprod.backmarket.fr/')
    cy.url().should('include', '/preprod')
    cy.get('[data-test=auth-label]').click({force: true})

  })
  it('Registration ok', () => {
    cy.wait(1000)
    cy.get('#email-signup').type('toto'+Math.floor((Math.random() * 32))+'@gmail.com')
    cy.wait(1000)
    cy.get('#firstName-signup').type('toto')
    cy.get('#lastName-signup').type('tata')
    cy.get('#password-signup').type('Bark1234')
    cy.get('[type="checkbox"]').check({force: true})
    cy.get('[data-test=signup-submit-button').click()
    cy.url().should('eq','https://preprod.backmarket.fr/dashboard/orders')
    cy.get('._3n2xnit7tS5cnEawJw8ljw').last().click()
  
  })
  it('Empty fields', ()=>{
    cy.get('[data-test=signup-submit-button').click()
    cy.url().should('eq','https://preprod.backmarket.fr/register')

  })

  it('Wrong password', ()=>{
    cy.wait(1000)
    cy.get('#email-signup').type('toto2002@gmail.com')
    cy.get('#firstName-signup').type('toto')
    cy.get('#lastName-signup').type('tata')
    cy.get('#password-signup').type('ark1234')
    cy.get('[type="checkbox"]').check({force: true})
    cy.contains('Merci de saisir un mot de passe valide.')
    cy.get('[data-test=signup-submit-button').click().should('have.class', '_1BSnq0bsVHu9nh0ahWxTMW')

  })

  it('Mail already exists', ()=>{
    cy.wait(1000)
    cy.get('#email-signup').type('toto2007@gmail.com')
    cy.get('#firstName-signup').type('toto')
    cy.get('#lastName-signup').type('tata')
    cy.get('#password-signup').type('Bark1234')
    cy.get('[type="checkbox"]').check({force: true})
    cy.get('[data-test=signup-submit-button').click().should('have.class', '_1BSnq0bsVHu9nh0ahWxTMW')
    cy.contains('Un utilisateur avec cette adresse email existe déjà')

  })


});