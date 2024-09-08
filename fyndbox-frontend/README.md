# FyndBox Frontend

This is the frontend for the FyndBox application, built with **React** and **Vite** and styled using **Material UI**. It provides an intuitive interface for managing your inventory and other features.

## Project Structure

The project structure is as follows:

```plaintext
fyndbox-frontend/
├── dist/                  # Build output for production
├── node_modules/          # Project dependencies
├── public/                # Public assets (favicon, manifest, etc.)
├── src/                   # Source code for the application
│   ├── assets/            # Static assets like images
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Individual pages (e.g., Landing, Login)
│   ├── services/          # API or service logic
│   ├── theme/             # Theme and styling configuration (Material UI)
│   ├── App.tsx            # Main App component
│   └── main.tsx           # Vite entry file
├── .gitignore             # Files and folders to ignore in git
├── package.json           # Project metadata and dependencies
├── pnpm-lock.yaml         # Dependency lock file for pnpm
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
```

## Installation

1. **Install dependencies**:
   Make sure you have [pnpm](https://pnpm.io/) installed globally, then run:

   ```bash
   pnpm install
   ```
2. **Lint checking**:
   ```bash
    pnpm run lint
    ```
   Lint the project for coding style issues

3. **Start the development server**:

   ```bash
    pnpm run dev
   ```

   This will start the Vite development server at http://localhost:5173.


4. **Build for production**:
   ```bash
    pnpm run build
   ```
5. **Preview the production build**:
   ```bash
    pnpm run preview
   ```

## Technologies Used
- **React**: JavaScript library for building user interfaces
- **Vite**: A fast build tool and development server
- **Material UI**: A popular React UI framework for styling and components
- **TypeScript**: For static typing in JavaScript
- **pnpm**: Fast, disk space-efficient package manager
