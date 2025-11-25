# SCUMarketplace
SCUMarketplace is a web application hosting a marketplace for Santa Clara University students. Users can browse, buy, and sell items in a secure and convenient online environment.

## Table of Contents 
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Testing](#testing)
- [React + Vite](#react--vite)
- [React Compiler](#react-compiler)
- [Expanding the ESLint configuration](#expanding-the-eslint-configuration)
- [Documentation](#documentation)

## Features 
MVP Requirements: 
- Ability to see a gallery of things to buy, ordered by most recent of everything for sale (🟡)
- Ability to see core details like cost, title, and photos, and descriptions (🟡)
- Ability to add new listings (🟡)
  - Sellers should be able to specify details such as title, cost, description, tags/categories, and photos (🟡)
- Ability to buy the product being listed (🟡)
  - Asking to buy the product sends a message to the seller (🟡)
  - The seller can mark an item as ‘sold’ which causes the listing to be taken down (🟡)
- Users sign up with a school email (🟡)
  - If a user doesn’t have a school email, they cannot use the platform (🟡)
  - Users information will not be collected or stored (🟡)
  - Email will be verified (🟡)  

✅ : met  
❌ : not met  
🟡 : not tested yet  

## Tech Stack
SCUMarketplace is built with the following technologies:
### Frontend
- React - Component-based library for building interactive user interfaces with efficient rendering and a rich ecosystem
- Vite - Modern build tool providing fast hot module replacement (HMR) and optimized development experience
### Backend
- Node.js - Event-driven JavaScript runtime for handling multiple concurrent users efficiently
- Express - Lightweight web framework for building REST APIs and managing server-side routing
### Database 
- PostgreSQL - Robust relational database providing transactional integrity, complex query support, and scalability for handling users, listings, and transactions

## Setup

1. To install the dependencies, run `npm install`.
2. To start the application, run `npm run dev` in the Frontend folder and run `npm start` in the Server folder. 
- Currently, the server is configured to run on port 8080. Please make sure that there are no conflicting processes running on that port number.

## Testing 
This project uses a three-tier testing approach to ensure code quality and reliability.

### Unit Testing (Vitest)
Test individual React components and functions: `npm run test` in the Frontend folder

### Integration Testing (Jest)
Test backend API endpoints and database interactions: `npm run test:integration` in the Server folder 

### End-to-End Testing (Cypress)
Test complete user workflows in the browser: `npm run cypress:open`

### Running ALL Tests
To run all test suites before pushing code: `npm run test:all`  
See [Testing Documentation](./doc/TestingGuide.md) for detailed testing guidelines. 

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Documentation
Project documentation is organized in the [`/doc`](/doc) folder:

- [Class Diagram](./doc/Diagrams/ClassDiagram.PNG) - Client-Server Architecture with API endpoints
- [ER Diagram](./doc/Diagrams/ERDiagram.PNG) - Database schema and relationships
- [UML Activity Diagram](./doc/Diagrams/UMLActivityDiagram.PNG) - User workflow
- [UML Sequence Diagram](./doc/Diagrams/UMLSequenceDiagram.PNG) -  Message flow between User, Frontend, Server/Backend, and Database
- [Technology Plan](./doc/TechnologyPlan.md) - Tech stack and architecture decisions
- [Implementation Plan](./doc/ImplementationPlan.md) - Project timeline and milestones
- [System Requirements](./doc/SystemRequirements.pdf) - System requirements
- [Testing Documentation](./doc/TestingGuide.md) - Testing guidelines
