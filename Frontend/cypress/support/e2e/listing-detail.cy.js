describe('Listing Detail Page', () => {
  beforeEach(() => {
    cy.login('test@scu.edu', 'password123')
    cy.get('[class*="ListingCard"]').first().click()
  })

  it('should display all listing information', () => {
    cy.get('h2').should('exist')
    cy.contains('$').should('exist')
    cy.contains('Description').should('exist')
    cy.get('img').should('be.visible')
  })

  it('should allow user to contact seller', () => {
    cy.contains('Contact Seller').click()
    
    // This will trigger mailto, which Cypress can't fully test
    // But we can verify the button exists and is clickable
    cy.contains('Contact Seller').should('exist')
  })

  it('should allow seller to delete their own listing', () => {
    // Assuming the logged-in user owns this listing
    cy.contains('Delete Listing').click()
    
    // Handle confirmation dialog
    cy.on('window:confirm', () => true)
    
    cy.url().should('include', '/Gallery')
  })

  it('should navigate back to gallery', () => {
    cy.get('a[href="/Gallery"]').click()
    cy.url().should('include', '/Gallery')
  })
})
