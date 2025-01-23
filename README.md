
![drawSQL-image-export-2025-01-23](https://github.com/user-attachments/assets/930b5e38-a4da-42fa-9e81-5389ed8cce64)

![Screenshot 2025-01-23 at 8 48 26 AM](https://github.com/user-attachments/assets/f9ae04f3-2a3a-4d7a-9163-c11b21116096)



# Inventory Management and Server System

## Overview

The **Inventory Management and Server System** is a scalable, efficient, and secure full-stack application designed to manage inventory data, visualize trends, and provide interactive user features. It comprises two main components:

1. **Inventory Management Frontend**: A modern web application built with React and Next.js for managing inventory data and providing rich user interactions.
2. **Backend Server**: A robust server built using Node.js and Express, providing APIs for inventory management, authentication, and database operations.

This project demonstrates best practices in full-stack development and leverages industry-standard tools and frameworks.

---

## Key Features

### Frontend (Inventory Management)
- **Interactive Data Grid**: Sort, filter, and search functionality powered by Material-UI.
- **Data Visualization**: Generate insightful charts and graphs using Recharts.
- **State Management**: Efficiently managed with Redux Toolkit, including session persistence.
- **Responsive Design**: Cross-device compatibility achieved with Tailwind CSS and Material-UI.
- **Authentication**: Secure user authentication and role management integrated with the backend.

### Backend (Server)
- **Express Framework**: Lightweight and efficient backend architecture.
- **Prisma ORM**: Simplifies database operations with schema-driven migrations and queries.
- **Secure API**: Implements security measures using Helmet and CORS.
- **Middleware Support**: Logging, error handling, and request parsing via Morgan and Body-Parser.
- **Development Utilities**: Tools like Nodemon and Concurrently streamline development and testing.

---

## Technology Stack

### Frontend
- **Frameworks & Libraries**: React, Next.js
- **Styling**: Material-UI, TailwindCSS
- **State Management**: Redux Toolkit
- **Data Visualization**: Recharts
- **HTTP Requests**: Axios

### Backend
- **Server**: Node.js, Express
- **Database Management**: Prisma ORM
- **Security**: Helmet, CORS
- **Utilities**: Morgan (logging), Concurrently

---

## Dependencies and Development Tools

### Frontend Project

#### Core Dependencies
- `@emotion/react` & `@emotion/styled`: Styling utilities for React.
- `@mui/material` & `@mui/x-data-grid`: Material-UI components for design and data grids.
- `@reduxjs/toolkit` & `redux-persist`: Simplified state management and persistence.
- `axios`: HTTP client for API communication.
- `next`: Framework for server-side rendering.
- `recharts`: Library for data visualization.
- `uuid`: Unique identifier generation.

#### Development Dependencies
- TypeScript support libraries (`@types/*`)
- `eslint`: Code quality and linting.
- `tailwindcss` & `postcss`: CSS utilities and plugins.
- `typescript`: Static type checking.

### Backend Project

#### Core Dependencies
- `@prisma/client`: Database ORM.
- `body-parser`: Parses incoming request bodies.
- `concurrently`: Runs multiple commands concurrently.
- `dotenv`: Environment variable management.
- `express`: Backend framework.
- `helmet`: Security middleware.
- `morgan`: Request logging middleware.

#### Development Dependencies
- TypeScript support libraries (`@types/*`)
- `nodemon`: Monitors for changes and restarts the server.
- `ts-node`: TypeScript execution engine.
- `typescript`: Static type checking.

---

## Installation and Setup

### Prerequisites
- Node.js (v14+)
- npm or Yarn
- PostgreSQL (for database)

### Frontend Setup
1. Clone the repository.
2. Navigate to the `frontend` directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env` file with database credentials.
4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the server:
   ```bash
   npm run dev
   ```
   
