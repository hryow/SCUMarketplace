// Custom login command for reusability
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input[placeholder="email@scu.edu"]').type(email)
  cy.get('input[placeholder="password"]').type(password)
  cy.get('button[type="submit"]').contains('Log In').click()
  cy.url().should('include', '/Gallery')
})

// Custom command to create a listing
Cypress.Commands.add('createListing', (listingData) => {
  cy.get('a[href="/CreateListing"]').click()
  cy.get('input[placeholder*="listing name"]').type(listingData.title)
  cy.get('input[placeholder*="price"]').type(listingData.price)
  cy.get('input[placeholder*="location"]').type(listingData.location)
  cy.get('textarea').type(listingData.description)
  
  // Handle image upload
  cy.get('input[type="file"]').selectFile(listingData.imagePath)
  
  cy.get('button[type="submit"]').click()
})
