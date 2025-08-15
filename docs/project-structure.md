# Project Structure

This document provides a detailed overview of the project structure and organization.

## 📁 Root Directory

```
landing-page-builder/
├── README.md              # Main project documentation
├── .gitignore            # Git ignore patterns for the entire project
├── client/               # React frontend application
├── backend/              # Node.js/Express backend API
├── docs/                 # Project documentation
└── examples/             # Sample data and usage examples
```

## 🎨 Client Directory

```
client/
├── src/                  # Source code
│   ├── components/       # Reusable React components
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── constants/       # Application constants
│   ├── assets/          # Static assets (images, fonts, etc.)
│   ├── landingPageDashboard/  # Main dashboard components
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Application entry point
│   ├── App.css          # Global application styles
│   ├── index.css        # Base CSS styles
│   └── vite-env.d.ts    # Vite environment type definitions
├── public/              # Static public assets
│   └── vite.svg         # Vite logo
├── package.json         # Dependencies and scripts
├── package-lock.json    # Locked dependency versions
├── pnpm-lock.yaml       # PNPM lock file
├── tsconfig.json        # TypeScript configuration
├── tsconfig.app.json    # App-specific TypeScript config
├── tsconfig.node.json   # Node-specific TypeScript config
├── vite.config.ts       # Vite build configuration
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML entry point
├── README.md            # Client-specific documentation
└── .gitignore           # Client-specific git ignore
```

### Client Architecture

- **Components**: Organized by feature and reusability
- **Hooks**: Custom React hooks for shared logic
- **Types**: TypeScript definitions for type safety
- **Utils**: Pure utility functions
- **Constants**: Application-wide constants
- **Dashboard**: Main landing page builder interface

## 🔧 Backend Directory

```
backend/
├── src/                  # Source code (if using build step)
├── prisma/              # Database related files
│   ├── schema.prisma    # Database schema definition
│   └── migrations/      # Database migration files
├── routes/              # Express route handlers
│   ├── landingPageRoutes.ts  # Landing page API endpoints
│   └── webhookRoutes.ts      # Webhook API endpoints
├── services/            # Business logic layer
│   ├── landingPageService.ts  # Landing page business logic
│   └── webhookService.ts      # Webhook business logic
├── middleware/          # Express middleware
│   ├── errorHandler.ts  # Centralized error handling
│   └── validation.ts    # Request validation middleware
├── validation/          # Input validation schemas
│   └── schemas.ts       # Zod validation schemas
├── types/               # TypeScript type definitions
│   └── index.ts         # Shared type definitions
├── logs/                # Application logs
│   └── server.log       # Server activity logs
├── tests/               # Test files and mock data
│   └── sample-request.json  # Sample API request data
├── archive/             # Archived and backup files
│   └── schema-backup.prisma  # Previous schema backup
├── main.ts              # Server entry point
├── package.json         # Dependencies and scripts
├── package-lock.json    # Locked dependency versions
├── pnpm-lock.yaml       # PNPM lock file
├── tsconfig.json        # TypeScript configuration
├── README.md            # Backend-specific documentation
├── .env                 # Environment variables (not in git)
└── .gitignore           # Backend-specific git ignore
```

### Backend Architecture

- **Routes**: RESTful API endpoints organized by resource
- **Services**: Business logic separated from controllers
- **Middleware**: Reusable request processing logic
- **Validation**: Input validation using Zod schemas
- **Types**: Shared TypeScript type definitions
- **Prisma**: Database schema and migration management

## 📚 Documentation Directory

```
docs/
├── project-structure.md      # This file - project organization
├── architecture-migration.md # Database schema migration guide
└── code-improvements.md      # Code quality improvements log
```

### Documentation Purpose

- **Architecture**: Explains the overall system design
- **Migration**: Documents database schema changes
- **Improvements**: Tracks code quality enhancements
- **Structure**: Details project organization (this file)

## 🎯 Examples Directory

```
examples/
└── sample-page-data.json     # Example landing page JSON structure
```

### Examples Purpose

- **Sample Data**: Demonstrates expected data structures
- **Usage Examples**: Shows how to use the API
- **Testing**: Provides data for manual testing

## 🏗️ Key Design Principles

### 1. **Separation of Concerns**
- Client and backend are completely separate applications
- Clear boundaries between routes, services, and data layers
- Business logic isolated in service layers

### 2. **Type Safety**
- TypeScript used throughout both client and backend
- Shared type definitions where appropriate
- Runtime validation with Zod schemas

### 3. **Scalability**
- Modular architecture allows easy feature additions
- Clear folder structure supports team development
- Service layer abstraction enables easy testing

### 4. **Documentation**
- Self-documenting code with clear naming
- Comprehensive README files at each level
- Separate documentation for complex topics

### 5. **Development Experience**
- Fast development setup with clear scripts
- Hot reloading for both client and backend
- Comprehensive linting and formatting rules

## 📦 Package Management

### Dependencies Strategy
- **Client**: Modern React ecosystem with latest stable versions
- **Backend**: Proven Node.js libraries with focus on performance
- **Shared**: Minimal overlap, clear separation of concerns

### Lock Files
- Both `package-lock.json` and `pnpm-lock.yaml` maintained
- Ensures consistent builds across environments
- Version pinning for production stability

## 🔄 Development Workflow

### 1. **Setup**
```bash
# Install all dependencies
cd backend && npm install
cd ../client && npm install
```

### 2. **Development**
```bash
# Start both services
cd backend && npm run dev      # Port 3000
cd client && npm run dev       # Port 5173
```

### 3. **Database**
```bash
# Apply migrations
cd backend && npx prisma migrate dev
```

### 4. **Build**
```bash
# Build for production
cd client && npm run build
cd backend && npm run build    # If build step exists
```

## 📋 Best Practices

### File Naming
- **kebab-case** for directories: `landing-page-builder`
- **camelCase** for TypeScript files: `landingPageService.ts`
- **PascalCase** for React components: `LandingPageEditor.tsx`
- **lowercase** for config files: `package.json`, `.gitignore`

### Code Organization
- Group related functionality together
- Keep files focused and single-purpose
- Use index files to create clean imports
- Maintain consistent import ordering

### Documentation
- README at each major directory level
- Inline comments for complex business logic
- Type definitions serve as documentation
- Examples for common use cases

This structure promotes maintainability, scalability, and developer experience while keeping the codebase organized and easy to navigate.
