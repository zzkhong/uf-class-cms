# UF Class CMS

A system for a private education business to perform administrative functions, where administrators can keep track of **teachers** and their **classes**.

## Live Demo

- [https://uf-class-cms-fe.onrender.com](https://uf-class-cms-fe.onrender.com)
- Render free instance has cold start - might wait up to 3 ~ 5 min :)

## Project Structure

```
uf-class-cms/
├── class-backend/          # Express API Server
├── class-frontend/         # Next.js React Web
└── README.md
```

## Tech Stack

### Backend

- **Framework**: Express
- **Database**: PostgreSQL with Sequelize ORM
- **Validation**: Zod
- **Testing**: Vitest

### Frontend

- **Framework**: Next.js
- **UI Library**: Ant Design
- **State Management**: TanStack React Query
- **HTTP Client**: Axios

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/zzkhong/uf-class-cms.git
cd uf-class-cms
```

### 2. Backend Setup

```bash
cd class-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database configuration

# Start PostgreSQL database
docker-compose up -d

# Run database creation
npm run db:create

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

The backend will be available at `http://localhost:3001`

### 3. Frontend Setup

```bash
cd class-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your backend API URL

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Teachers

- `GET /api/teachers` - List all teachers
- `POST /api/teachers` - Create a new teacher

### Classes

- `GET /api/classes` - List all classes
- `POST /api/classes` - Create a new class

### Health Check

- `GET /health` - API health status

### API Testing

A Postman collection is included for testing the API endpoints:

- **Location**: `class-backend/doc/postman_collection.json`
- **Import** this file into Postman to test all endpoints with sample data

## DB Schema

### Teachers Table

- `id` (Primary Key)
- `name` (Required)
- `subject` (Required, from predefined options)
- `email` (Required, Unique)
- `contactNumber` (Optional)
- `createdAt`, `updatedAt` (Timestamps)

### Classes Table

- `id` (Primary Key)
- `name` (Required)
- `level` (Required, from predefined options)
- `teacherId` (Foreign Key to Teachers)
- `createdAt`, `updatedAt` (Timestamps)

## Assumptions

1. **Teacher Email Uniqueness**: Each teacher must have a unique email address
2. **Subject & Level Hardcoding**: Subject and level options are hardcoded in FE from predefined options
3. **Authentication**: No auth is required

## API Design Suggestions

1. **Idempotency**: Implement idempotency keys for POST/PUT operations
2. **Pagination**: Add pagination support for list endpoints
3. **Separate Options API**: Create dedicated endpoint for subject/level options
4. **API Versioning**: Implement versioning strategy (e.g., `/api/v1/`)
5. **Row Key Returns**: Return created/updated record IDs for frontend row management
