describe('Gallery Page', () => {
  beforeEach(() => {
    cy.login('test@scu.edu', 'password123')
  })

  it('should display listing cards', () => {
    cy.get('[class*="ListingCard"]').should('have.length.greaterThan', 0)
  })

  it('should show listing details when card is clicked', () => {
    cy.get('[class*="ListingCard"]').first().click()
    cy.url().should('include', '/listing/')
    
    // Verify listing details are shown
    cy.get('h2').should('exist')
    cy.contains('$').should('exist')
    cy.contains('Contact Seller').should('exist')
  })

  it('should filter listings by search', () => {
    cy.get('input[placeholder*="search"]').type('laptop')
    cy.get('[class*="ListingCard"]').each(($card) => {
      cy.wrap($card).should('contain.text', 'laptop')
    })
  })
})
