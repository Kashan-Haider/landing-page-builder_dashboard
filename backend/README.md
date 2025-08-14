# Landing Page Builder Backend

A clean, well-structured Node.js/Express backend API for creating and managing landing pages with webhook support.

## 🏗️ Architecture

This backend follows a clean, modular architecture with proper separation of concerns:

```
backend/
├── main.ts                 # Express app setup and configuration
├── types/
│   └── index.ts            # TypeScript interface definitions
├── services/
│   ├── landingPageService.ts # Business logic for landing pages
│   └── webhookService.ts    # Webhook management and triggering
├── routes/
│   ├── landingPageRoutes.ts # Landing page API endpoints
│   └── webhookRoutes.ts     # Webhook API endpoints
└── prisma/
    └── schema.prisma        # Database schema
```

## 🚀 Features

- **TypeScript**: Fully typed with custom interfaces for better development experience
- **Clean API**: Consistent response formats and error handling across all endpoints
- **Prisma ORM**: Type-safe database operations with PostgreSQL
- **Webhook System**: Automatic webhook triggering for landing page events
- **Comprehensive Error Handling**: Proper error responses with meaningful messages
- **Request Logging**: Built-in request logging for debugging
- **Health Checks**: System status and uptime monitoring

## 🔧 API Endpoints

### Landing Pages
- `GET /api/landing-pages` - Get all landing pages
- `GET /api/landing-pages/:id` - Get landing page by ID
- `POST /api/landing-pages` - Create new landing page
- `PUT /api/landing-pages/:id` - Update landing page
- `DELETE /api/landing-pages/:id` - Delete landing page

### Webhooks
- `GET /api/webhooks` - Get all webhook configurations
- `POST /api/webhooks` - Create new webhook
- `PATCH /api/webhooks/:id/toggle` - Enable/disable webhook
- `GET /api/webhooks/logs` - Get webhook execution logs

## 📝 API Response Format

All API responses follow a consistent format:

```json
{
  "success": boolean,
  "data": any,           // Present on success
  "error": string,       // Present on error
  "message": string      // Human-readable message
}
```

## 🔗 TypeScript Interfaces

The `types/index.ts` file contains comprehensive TypeScript interfaces for:

- `CreateLandingPageData` - Input data for creating landing pages
- `BusinessContact`, `SEOSettings`, `Theme` - Core business entities
- `HeroSection`, `AboutSection`, etc. - All landing page sections
- `WebhookConfig`, `WebhookPayload` - Webhook related types
- `ApiResponse<T>` - Standardized API response type

## 🎯 Key Improvements Made

### 1. **Code Organization**
- Separated concerns into distinct service and route layers
- Created reusable TypeScript interfaces
- Centralized database query includes for consistency

### 2. **Error Handling**
- Consistent error handling across all endpoints
- Proper HTTP status codes (400 for validation, 404 for not found, 500 for server errors)
- Detailed error messages with context

### 3. **Type Safety**
- Full TypeScript coverage with custom interfaces
- Proper type checking for all API inputs and outputs
- Better IDE support and development experience

### 4. **Performance**
- Efficient database queries with proper includes
- Reusable query patterns to reduce code duplication
- Optimized webhook processing with concurrent execution

### 5. **Maintainability**
- Clear separation between business logic and HTTP handling
- Modular services that can be easily tested and extended
- Consistent coding patterns throughout the codebase

## 🛠️ Development

### Prerequisites
- Node.js 16+
- PostgreSQL database
- pnpm package manager

### Setup
1. Install dependencies: `pnpm install`
2. Set up environment variables in `.env`
3. Run database migrations: `npx prisma migrate dev`
4. Generate Prisma client: `npx prisma generate`
5. Start development server: `pnpm run dev`

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

## 🧪 Testing

The API can be tested using the provided `test-create-landing-page.json` file which contains a complete example of landing page data.

## 🔍 Health Monitoring

- **Root endpoint** (`/`): API status and version information
- **Health endpoint** (`/health`): System uptime and status
- **Request logging**: All requests are logged with timestamps

## 🎨 Clean Code Principles

This codebase follows clean code principles:

- **Single Responsibility**: Each class/function has one clear purpose
- **DRY (Don't Repeat Yourself)**: Common patterns are extracted and reused
- **Proper Error Handling**: Comprehensive error catching and meaningful messages
- **Type Safety**: Full TypeScript coverage prevents runtime errors
- **Consistent Formatting**: Standardized code style throughout
