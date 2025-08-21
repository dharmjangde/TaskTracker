# Overview

This is a frontend-only productivity application built with React and Vite that helps users manage their daily tasks, track study sessions, monitor expenses, and view progress reports. The application features a modern interface using shadcn/ui components and uses hardcoded mock data for demonstration purposes. This version is optimized for Vercel deployment and does not require any backend server.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend uses React with TypeScript and Vite as the build tool. The application follows a component-based architecture with:

- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **Charts**: Recharts for data visualization

## Backend Architecture
The backend is built with Express.js and follows a RESTful API pattern:

- **Server Framework**: Express.js with TypeScript
- **Development Setup**: Vite middleware integration for development
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Session Management**: Built-in support for PostgreSQL sessions

## Data Storage Solutions
The application uses a hybrid storage approach:

- **Development**: In-memory storage implementation for rapid development
- **Production**: PostgreSQL database with Drizzle ORM
- **Schema**: Comprehensive schema including users, tasks, expenses, study sessions, and achievements
- **Migrations**: Drizzle-kit for database migrations

## Database Schema Design
The database includes five main entities:
- **Users**: Authentication and streak tracking
- **Tasks**: Task management with priority, status, and time estimation
- **Expenses**: Expense tracking with categories and amounts
- **Study Sessions**: Study time tracking by subject
- **Achievements**: Gamification system for user engagement

## Frontend Structure
- **Pages**: Dashboard, Tasks, Expenses, Study Tracker, Reports
- **Components**: Reusable UI components, charts, modals, and layout components
- **Hooks**: Custom hooks for mobile detection, productivity data, and toast notifications
- **Routing**: Single-page application with protected routes

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting (via @neondatabase/serverless)
- **Drizzle ORM**: Type-safe database operations and migrations
- **connect-pg-simple**: PostgreSQL session store for Express

## UI and Design
- **Radix UI**: Accessible component primitives for form controls, dialogs, and navigation
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent iconography
- **Recharts**: Chart library for data visualization

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast bundling for production builds
- **Replit Plugins**: Development environment integration

## Data Management
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form validation and handling
- **Zod**: Schema validation with Drizzle integration
- **date-fns**: Date manipulation utilities

## Navigation and Interaction
- **Wouter**: Lightweight client-side routing
- **Embla Carousel**: Touch-friendly carousel components
- **CMDK**: Command palette functionality