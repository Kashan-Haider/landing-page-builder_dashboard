# Docker Setup for Landing Page Builder

This guide will help you run the Landing Page Builder platform using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on your system
- Git (to clone the repository)

## Quick Start

1. **Clone the repository** (if not already done):
   ```bash
   git clone <your-repo-url>
   cd landing-page-builder_dashboard
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your preferred settings.

3. **Start all services**:
   ```bash
   docker-compose up -d
   ```

4. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Database: localhost:5432

## Services

### PostgreSQL Database
- **Container**: `landing-page-db`
- **Port**: 5432
- **Database**: `landing_page_builder`
- **Username**: `postgres`
- **Password**: `postgres123`

### Backend API
- **Container**: `landing-page-backend`
- **Port**: 3000
- **Technology**: Node.js + Express + TypeScript + Prisma

### Frontend
- **Container**: `landing-page-frontend`
- **Port**: 5173
- **Technology**: React + Vite + TypeScript + Tailwind CSS

## Useful Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Rebuild services
```bash
# Rebuild all
docker-compose up --build

# Rebuild specific service
docker-compose up --build backend
```

### Database operations
```bash
# Run Prisma migrations
docker-compose exec backend npx prisma migrate dev

# Reset database
docker-compose exec backend npx prisma migrate reset

# View database
docker-compose exec backend npx prisma studio
```

### Access container shell
```bash
# Backend container
docker-compose exec backend sh

# Frontend container
docker-compose exec frontend sh

# Database container
docker-compose exec postgres psql -U postgres -d landing_page_builder
```

## Development Workflow

1. **Make code changes** in your local files
2. **Hot reload** is enabled for both frontend and backend
3. **Database changes**: Run migrations inside the backend container
4. **New dependencies**: Rebuild the affected service

## Production Deployment

For production deployment, consider:

1. **Environment variables**: Update `.env` with production values
2. **Database**: Use a managed PostgreSQL service
3. **Secrets**: Use Docker secrets or external secret management
4. **SSL/TLS**: Add reverse proxy (nginx) for HTTPS
5. **Monitoring**: Add logging and monitoring services

## Troubleshooting

### Port conflicts
If ports 3000, 5173, or 5432 are already in use, modify the port mappings in `docker-compose.yml`.

### Database connection issues
Ensure the `DATABASE_URL` in your `.env` file matches the PostgreSQL service configuration.

### Permission issues
On Linux/macOS, you might need to adjust file permissions:
```bash
sudo chown -R $USER:$USER .
```

### Clean restart
```bash
docker-compose down -v
docker-compose up --build
```

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   PostgreSQL    │
│   (React/Vite)  │◄──►│  (Node.js/API)  │◄──►│   (Database)    │
│   Port: 5173    │    │   Port: 3000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

The frontend communicates with the backend API, which connects to the PostgreSQL database using Prisma ORM.
