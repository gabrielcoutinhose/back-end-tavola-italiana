# Back End Tavola Italiana (Simple Documentation)

## Local project structure

### Notes

- Run this CMD to neutralize errors; if necessary in local repo instances.
- It will install the packages and project dependencies; (just to remove alert errors... because, we'll run in docker)

```bash
yarn
```

### **Function Classification Table**

| **Function**                        | **Related Items**                                                                              | **Description**                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Container Configuration**         | `docker-compose.yml`, `dockerfile`, `.dockerignore`                                            | Files related to project configuration and containerization with Docker.                    |
| **Environment Management**          | `.env`, `.env.example`, `.env.production`                                                      | Files that store environment variables for different contexts (development and production). |
| **Source Control**                  | `.gitignore`                                                                                   | List of files/directories that should be ignored by Git.                                    |
| **Tool Configuration**              | `eslint.config.mjs`, `.prettierrc`, `.sequelizerc`, `nodemon.json`                             | Configuration files for ESLint, Prettier, Sequelize CLI, and Nodemon.                       |
| **Project Dependencies**            | `package.json`, `yarn.lock`                                                                    | Files that manage Node.js and Yarn dependencies.                                            |
| **Documentation**                   | `README.md`, `structure.txt`                                                                   | Project documentation files and directory structure.                                        |
| **VSCode Configuration**            | `.vscode/launch.json`                                                                          | Development environment configuration in Visual Studio Code.                                |
| **CI/CD (Automation)**              | `.github/workflows/main.yml`                                                                   | Pipeline file for continuous integration and delivery automation in GitHub Actions.         |
| **Backend - Main Structure**        | `src/app.js`, `src/server.js`, `src/routes.js`                                                 | Main files for initialization, routes, and backend entry.                                   |
| **Backend - Modules and Functions** | `src/app/controllers/`, `src/app/models/`                                                      | Implementation of project controllers and models.                                           |
| **Database Configuration**          | `src/config/database.js`, `src/database/`, `src/database/index.js`, `src/database/migrations/` | Database configuration and management files for PostgreSQL (via Sequelize) and MongoDB.     |

---

### Project structure

- In this case; i generate using this command:

```bash
tree -a -I "node_modules|dist|.git" > structure.txt
```

- The initial structure:

```bash
.
├── docker-compose.yml # Docker Compose configuration to orchestrate project containers.
├── dockerfile # Instructions for building the backend Docker image.
├── .dockerignore # Files and directories that Docker should ignore when building the image.
├── .env # Environment variables used for local development. (not versioned)
├── .env.example # Example of environment variables to facilitate project configuration.
├── .env.production # Environment variables specific to the production environment. (not versioned)
├── eslint.config.mjs # Configuration for ESLint, a linting tool for JavaScript. ├── .github # Directory containing GitHub-related configurations.
│   └── workflows
│   └── main.yml # CI/CD pipeline configured for GitHub Actions.
├── .gitignore # Files and directories that should be ignored by Git.
├── nodemon.json # Nodemon configuration to automatically restart the server during development.
├── package.json # List of project dependencies and scripts managed by Node.js.
├── .prettierrc # Configuration for Prettier, a code formatting tool.
├── README.md # Main project documentation, with instructions and important details. ├── .sequelizerc # Configuration for the Sequelize CLI.
├── src # Main directory of the project's source code.
│   ├── app # Contains the backend controllers and models.
│   │   ├── controllers # Controller logic, handling routes and business logic.
│   │   └── models # Data model definitions for Sequelize.
│   ├── app.js # Initialization file for the Express application.
│   ├── config # General project settings. │   │   └── database.js # Database configuration (PostgreSQL or MongoDB).
│   ├── database # Directory related to database management.
│   │   ├── index.js # Entry point to connect to the database.
│   │   └── migrations # Sequelize migration files to structure the database.
│   ├── routes.js # Definition of all application routes.
│   └── server.js # Main file that initializes the server.
├── structure.txt # Automatically generated file with the project structure. ├── .vscode # Visual Studio Code-specific configurations.
│   └── launch.json # Launch configurations for debugging in VS Code.
└── yarn.lock # Lock file generated by Yarn to ensure exact versions of dependencies.

11 directories, 22 files
```

## Build and run, this project using different modes:

### Mounting, reassembly, running and stopping the project container.

```bash
docker-compose build
docker-compose up
docker-compose down
```

### Configured in this project

```bash
NODE_ENV=dev docker-compose up
```

```bash
NODE_ENV=debug docker-compose up
```

```bash
NODE_ENV=test docker-compose up
```

```bash
NODE_ENV=production docker-compose up -d
```

### Simulated production building

- Build on (prod) in this case with two docker-compose.yml the standard and the production;

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

- Build on (prod) and injecting a specific file (for a simulated production, the idea is not tracked this file...)

```bash
docker-compose --env-file .env.production up --build
```

- A second method; using the manual injection through the terminal(CLI)

```bash
docker run -d --name backend-prod \
  --link postgres:postgres-db \
  --link mongo:mongo-db \
  --env-file .env.production \
  -p 8080:8080 backend:prod
```
