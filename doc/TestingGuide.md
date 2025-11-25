# Testing Guide

## Overview
SCUMarketplace uses automated testing at three levels to maintain code quality and catch bugs early.

## Testing Stack
- **Vitest**: Unit tests for React components
- **Jest + Supertest**: Integration tests for Express API endpoints
- **Cypress**: End-to-end tests for user workflows
- **Testing Library**: Component testing utilities

## Unit Testing

### Setup
Dependencies are already configured in `package.json`. Tests are located in `Frontend/tests`

### Writing Tests
Example component test:
```
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

test('renders product name and price', () => {
render(<ProductCard name="Textbook" price={50} />);
expect(screen.getByText('Textbook')).toBeInTheDocument();
expect(screen.getByText('$50')).toBeInTheDocument();
});
```

### Running Unit Tests
```
npm run test # Run all unit tests
npm run test:watch # Watch mode for development
npm run test:coverage # Generate coverage report
```


## Integration Testing

### Purpose
Verify that API endpoints correctly interact with PostgreSQL database.

### Test Structure
Tests are in `Server/tests.`

### Example Test
```
const request = require('supertest');
const app = require('../server');

describe('GET /api/products', () => {
it('returns all products', async () => {
const response = await request(app).get('/api/products');
expect(response.status).toBe(200);
expect(Array.isArray(response.body)).toBe(true);
});
});
```

### Running Integration Tests
`npm run test:integration`


## End-to-End Testing

### Purpose
Test complete user journeys from frontend through backend to database.

### Test Scenarios
Located in `cypress/e2e/`:
- User registration and login
- Browsing and searching products
- Creating a new listing
- Purchasing workflow

### Running E2E Tests
```
npm run cypress:open # Interactive mode
npm run cypress:run # Headless mode for CI/CD
```

## CI/CD Integration
Tests automatically run on every pull request via GitHub Actions. All tests must pass before merging.

