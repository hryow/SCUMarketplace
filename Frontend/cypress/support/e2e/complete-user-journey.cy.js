describe('Complete User Journey', () => {
  it('should complete full marketplace workflow', () => {
    // Given: User starts on login page
    cy.visit('/')
    
    // When: User signs up
    cy.contains('Sign up for free').click()
    cy.get('input[placeholder="email@scu.edu"]').type('journey@scu.edu')
    cy.get('input[placeholder="password"]').type('testpass123')
    cy.get('input[placeholder="name"]').type('Journey Test')
    cy.get('button[type="submit"]').contains('Sign Up').click()
    
    // Then: User sees gallery
    cy.url().should('include', '/Gallery')
    
    // When: User creates a listing
    cy.get('a[href="/CreateListing"]').click()
    cy.get('input[placeholder*="listing name"]').type('Test Item')
    cy.get('input[placeholder*="price"]').type('99')
    cy.get('input[placeholder*="location"]').type('Campus')
    cy.get('textarea').type('Test description')
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg')
    cy.get('button[type="submit"]').click()
    
    // Then: Listing appears in gallery
    cy.contains('Test Item').should('be.visible')
    
    // When: User views their listing
    cy.contains('Test Item').click()
    
    // Then: All details are visible
    cy.contains('$99').should('be.visible')
    cy.contains('Test description').should('be.visible')
  })
})
