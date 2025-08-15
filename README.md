# Landing Page Builder

A modern, full-stack web application for creating and managing landing pages with a React client and Node.js/Express backend.

## 🚀 Features

- **Drag & Drop Builder**: Intuitive interface for creating landing pages
- **Template System**: Pre-built templates and custom template creation
- **Image Management**: Upload and manage images for your pages
- **SEO Optimization**: Built-in SEO tools and meta tag management
- **Webhook Integration**: Connect with third-party services
- **JSON-Based Content**: Flexible content structure without rigid schema constraints
- **Status Management**: Draft, publish, unpublish, and archive pages

## 🏗️ Project Structure

```
landing-page-builder/
├── client/                 # React frontend application
│   ├── src/               
│   ├── public/            
│   └── package.json       
├── backend/               # Node.js/Express API server
│   ├── prisma/           # Database schema and migrations
│   ├── routes/           # API route handlers
│   ├── services/         # Business logic layer
│   ├── middleware/       # Express middleware
│   ├── validation/       # Input validation schemas
│   ├── types/            # TypeScript type definitions
│   ├── logs/             # Server logs
│   ├── tests/            # Test files and samples
│   ├── archive/          # Archived/backup files
│   └── package.json      
├── docs/                  # Project documentation
│   ├── architecture-migration.md  # Database schema migration info
│   └── code-improvements.md       # Code quality improvements
└── examples/              # Sample data and examples
    └── sample-page-data.json      # Example landing page structure
```

## 🛠️ Technology Stack

### Backend
- **Node.js** with **Express** - REST API server
- **TypeScript** - Type-safe development
- **Prisma** - Database ORM and migrations
- **Zod** - Runtime validation and type checking
- **PostgreSQL/SQLite** - Database (configurable)

### Frontend
- **React 19** - User interface framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and development server
- **React Hook Form** - Form handling and validation
- **Axios** - HTTP client for API calls

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Database (PostgreSQL recommended, SQLite for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd landing-page-builder
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   # or
   pnpm install
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:3000`

2. **Start the client development server**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:5173`

## 📡 API Endpoints

### Landing Pages
- `GET /api/landing-pages` - Get all pages
- `GET /api/landing-pages/:id` - Get single page
- `POST /api/landing-pages` - Create new page
- `PUT /api/landing-pages/:id` - Update page
- `DELETE /api/landing-pages/:id` - Delete page

### Page Management
- `POST /api/landing-pages/:id/publish` - Publish page
- `POST /api/landing-pages/:id/unpublish` - Unpublish page
- `POST /api/landing-pages/:id/archive` - Archive page

### Image Management  
- `GET /api/landing-pages/:id/images` - Get page images
- `POST /api/landing-pages/:id/images` - Add image
- `DELETE /api/landing-pages/images/:imageId` - Delete image

### Webhooks
- `GET /api/webhooks` - Get all webhooks
- `POST /api/webhooks` - Create webhook
- `PUT /api/webhooks/:id` - Update webhook
- `DELETE /api/webhooks/:id` - Delete webhook

## 🗄️ Database Schema

The application uses a simplified 6-model schema:

- **LandingPage** - Main model with JSON content fields
- **Image** - Image management with auto-cascading
- **Template** - Reusable page templates  
- **Webhook** - Webhook management
- **WebhookLog** - Webhook execution logging
- **User** - User management (for future multi-tenancy)

## 🏃‍♂️ Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Run database migrations: `npx prisma migrate deploy`
4. Start the server: `npm start`

### Client Deployment
1. Build for production: `npm run build`
2. Serve the `dist` folder using a static file server
3. Configure your web server to handle client-side routing

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Client Tests
```bash
cd client
npm test
```

## 📚 Documentation

- [Architecture Migration](./docs/architecture-migration.md) - Database schema evolution
- [Code Improvements](./docs/code-improvements.md) - Code quality enhancements
- [Sample Data](./examples/sample-page-data.json) - Example page structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Open an issue on GitHub
- Check the documentation in the `/docs` folder
- Review sample code in `/examples`

---

Built with ❤️ using React, Node.js, and TypeScript
