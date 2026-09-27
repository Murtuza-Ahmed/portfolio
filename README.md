# Full-Stack MERN Project

A complete full-stack web application built with Next.js, TypeScript, MongoDB, and Material-UI. Features include user authentication, admin panel, project management, and contact form functionality.

## Features

### Frontend

- **Modern UI**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Material-UI Integration**: Professional components with custom styling
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Dark/Light Mode**: Theme switching with system preference detection
- **SEO Optimized**: Meta tags, Open Graph, and structured data

### Backend

- **RESTful API**: Complete CRUD operations for all entities
- **Authentication**: JWT-based auth with role-based access control
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Input validation with Yup schemas
- **Security**: Password hashing, CORS protection, and rate limiting

### Admin Panel

- **Dashboard**: Statistics and analytics overview
- **User Management**: CRUD operations for user accounts
- **Project Management**: Portfolio project management with image uploads
- **Message Management**: Contact form submission handling
- **Settings**: Application configuration and preferences

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS
- **UI Components**: Material-UI (MUI), Radix UI, Lucide Icons
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs, HTTP-only cookies
- **Validation**: Yup, React Hook Form
- **Development**: ESLint, Prettier, TypeScript

## Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- MongoDB installed and running (local or cloud)
- Git for version control

## Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd fullstack-mern-project
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Environment Setup

Copy the environment example file:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Update `.env.local` with your configuration:

\`\`\`env

# Database

MONGODB_URI=mongodb://localhost:27017/fullstack-mern-project

# JWT

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Admin Credentials

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin123!@#
\`\`\`

### 4. Database Setup

Start MongoDB and seed the database:

\`\`\`bash

# Seed the database with sample data

npm run seed
\`\`\`

### 5. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄️ Database Seeding

The project includes a comprehensive seeding script that populates your database with:

- **Admin user** with full access privileges
- **Sample users** for testing user management
- **Portfolio projects** with realistic data and images
- **Contact messages** in various states (unread, read, replied)

Run the seeding script:

\`\`\`bash
npm run seed
\`\`\`

**Default Admin Credentials:**

- Email: `admin@example.com`
- Password: `Admin123!@#`

## Authentication & Authorization

The application implements a complete authentication system:

### Features

- **JWT-based authentication** with HTTP-only cookies
- **Role-based access control** (admin/user roles)
- **Protected routes** with middleware
- **Password hashing** with bcryptjs
- **Session management** with automatic token refresh

### Admin Access

- Access the admin panel at `/admin`
- Use the seeded admin credentials to log in
- Admin users have full CRUD access to all resources

## UI/UX Design

The application follows modern design principles:

### Design System

- **Color Palette**: Carefully selected colors with dark/light mode support
- **Typography**: Inter for body text, JetBrains Mono for code
- **Spacing**: Consistent spacing scale using Tailwind CSS
- **Components**: Material-UI components with custom Tailwind styling

### Responsive Design

- **Mobile-first** approach
- **Breakpoint system**: sm, md, lg, xl breakpoints
- **Flexible layouts** with CSS Grid and Flexbox
- **Touch-friendly** interactions on mobile devices

## API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Admin Endpoints

- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - List users (with pagination)
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/[id]` - Update user
- `DELETE /api/admin/users/[id]` - Delete user

### Public Endpoints

- `GET /api/projects` - List public projects
- `GET /api/projects/[id]` - Get project details
- `POST /api/contact` - Submit contact form

## Deployment

### Vercel Deployment

1. **Connect to Vercel**:
   \`\`\`bash
   npm i -g vercel
   vercel
   \`\`\`

2. **Set Environment Variables**:
   - Add all environment variables from `.env.local`
   - Use a cloud MongoDB service (MongoDB Atlas)

3. **Deploy**:
   \`\`\`bash
   vercel --prod
   \`\`\`

### Environment Variables for Production

\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-secure-admin-password
\`\`\`

## Testing

Run the development server and test the following:

### Frontend Testing

- Navigate through all pages
- Test responsive design on different screen sizes
- Verify dark/light mode switching
- Test form submissions and validation

### Admin Panel Testing

- Log in with admin credentials
- Test CRUD operations for users, projects, and messages
- Verify pagination and search functionality
- Test role-based access control

### API Testing

- Use tools like Postman or curl to test API endpoints
- Verify authentication and authorization
- Test error handling and validation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information
3. Include error messages, screenshots, and steps to reproduce

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Material-UI](https://mui.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [MongoDB](https://www.mongodb.com/) for the database solution
- [Vercel](https://vercel.com/) for deployment platform
