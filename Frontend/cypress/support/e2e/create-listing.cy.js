describe('Create Listing Flow', () => {
  beforeEach(() => {
    cy.login('test@scu.edu', 'password123')
  })

  it('should navigate to create listing page', () => {
    cy.get('a[href="/CreateListing"]').click()
    cy.url().should('include', '/CreateListing')
    cy.contains('Create New Listing').should('be.visible')
  })

  it('should show error when submitting without required fields', () => {
    cy.get('a[href="/CreateListing"]').click()
    cy.get('button[type="submit"]').click()
    
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please upload an image')
    })
  })

  it('should successfully create a new listing', () => {
    cy.get('a[href="/CreateListing"]').click()
    
    // Fill out form
    cy.get('input[placeholder*="listing name"]').type('Test Laptop')
    cy.get('input[placeholder*="price"]').type('500')
    cy.get('input[placeholder*="location"]').type('Swig Hall')
    cy.get('textarea').type('Great condition, barely used')
    
    // Upload image (use a fixture)
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg')
    
    cy.get('button[type="submit"]').click()
    
    // Verify redirect to gallery
    cy.url().should('include', '/Gallery')
    
    // Verify new listing appears
    cy.contains('Test Laptop').should('be.visible')
  })
})
