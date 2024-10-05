# FyndBox Monorepo

This repository contains the code for the FyndBox application, which includes both the frontend and backend components. The frontend is built with React + Vite, the backend is built with NestJS, and shared utilities or configurations are stored in the `shared` directory. The project is managed using a monorepo structure with `pnpm` as the package manager.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Linting](#linting)
- [Contributing](#contributing)

## Getting Started

These instructions will guide you on how to set up the project on your local machine for development and testing.

## Prerequisites

Before setting up the project, ensure that you have the following installed:

1. **Git**:
   - Git is required for cloning the repository and managing version control. You can install Git by following the instructions [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

   - **Install Git on macOS**:
     ```bash
     brew install git
     ```
   - **Install Git on Ubuntu/Debian**:
     ```bash
     sudo apt-get update
     sudo apt-get install git
     ```
   - **Install Git on Windows**:
     Download the Git installer from [git-scm.com](https://git-scm.com/) and follow the installation instructions.


2. **Node.js** (v18.12 or later):
   - Download and install Node.js from the [official Node.js website](https://nodejs.org/).
   - Verify the installation:
     ```bash
     node -v
     ```
3. **pnpm** (v8 or later):
   - `pnpm` is the package manager used for this project. Install it globally using npm:
     ```bash
     npm install -g pnpm
     ```
   - Verify the installation:
     ```bash
     pnpm -v
     ```
4. **postgres**:
   - Download and install the [postgres](https://www.postgresql.org/download/).
   
     

## Project Structure

The repository is organized as follows:

```plaintext
FyndBox/
├── fyndbox-backend/        # Backend (NestJS)
├── fyndbox-frontend/       # Frontend (React + Vite)
├── shared/                 # Shared utilities and configurations
├── node_modules/           # Shared node modules
├── pnpm-workspace.yaml     # pnpm workspace configuration
├── package.json            # Root package.json with scripts and dependencies
├── .eslintrc.js            # Global ESLint configuration
├── .gitignore              # Global gitignore for the entire project
├── .gitmodules             # Git submodules configuration (if any)
├── pnpm-lock.yaml          # Lockfile for dependencies
└── README.md               # Project documentation
```

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/FyndBox/fynd-box.git
   cd fynd-box
   ```
2. **Install dependencies using pnpm**:

Run the following command from the root of the repository to install all dependencies for both the frontend, backend, and shared packages:

```bash
   pnpm install
```

## Running the Project

You can run both the frontend and backend concurrently using the following commands:

1. **Start both frontend and backend:**

   To start the entire application, you can run both the frontend and backend simultaneously with the following command:

   ```bash
   pnpm start
   ```

   This command will run the React frontend on the default Vite port (usually http://localhost:5173) and the NestJS backend on http://localhost:3000.

2. **Alternatively, run them individually:**

   If you prefer to start the frontend and backend separately, you can use the following commands:

    **Frontend:**

    ```bash
    pnpm start:frontend
    ```

    **Backend:**

    ```bash
    pnpm start:backend
    ```

## Linting

The project uses ESLint and Prettier for code linting and formatting. To run the linter:

```bash
pnpm lint
```

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes.
4. Commit your changes:

    ```bash
    git commit -m 'Add some feature'
    ```
5. Push to the branch.

    ```bash
    git push origin feature/YourFeature
    ```
6. Create a new Pull Request.
