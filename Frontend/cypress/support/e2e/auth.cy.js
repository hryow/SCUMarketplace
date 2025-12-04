describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display login page by default', () => {
    cy.contains('Log In').should('be.visible')
    cy.get('input[placeholder="email@scu.edu"]').should('be.visible')
    cy.get('input[placeholder="password"]').should('be.visible')
  })

  it('should switch between login and signup modes', () => {
    cy.contains('Sign up for free').click()
    cy.contains('Sign Up').should('be.visible')
    cy.get('input[placeholder="name"]').should('be.visible')
    
    cy.contains('Log in here').click()
    cy.contains('Log In').should('be.visible')
  })

  it('should successfully sign up a new user', () => {
    cy.contains('Sign up for free').click()
    
    cy.get('input[placeholder="email@scu.edu"]').type('newuser@scu.edu')
    cy.get('input[placeholder="password"]').type('password123')
    cy.get('input[placeholder="name"]').type('Test User')
    
    cy.get('button[type="submit"]').contains('Sign Up').click()
    
    cy.url().should('include', '/Gallery')
  })

  it('should display error for invalid credentials', () => {
    cy.get('input[placeholder="email@scu.edu"]').type('invalid@scu.edu')
    cy.get('input[placeholder="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Login failed').should('be.visible')
  })
})
