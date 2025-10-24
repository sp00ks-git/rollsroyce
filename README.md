# Web Portal for Questionnaire and Report Management

This project is a secure web portal for managing questionnaires and reports. It provides a full-stack solution with a React frontend and a Node.js/Express backend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Environment Setup

Before running the application, you need to set up the environment variables for the server.

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Create a `.env` file by copying the example file:
    ```bash
    cp .env.example .env
    ```
3.  Open the `.env` file in a text editor and replace `your_jwt_secret` with a secure, randomly generated string. This secret is used to sign the JSON Web Tokens (JWTs) for user authentication.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Python 3](https://www.python.org/downloads/)
- [Node.js and npm](https://nodejs.org/en/download/)

### Installation and Startup

A Python script is provided to automate the installation of all dependencies and the startup of the application servers.

1.  **Open a terminal or command prompt** in the root directory of the project.
2.  **Run the setup script** using the following command:

    ```bash
    python setup_and_start.py
    ```

#### What the script does:

-   **Installs Server Dependencies:** It runs `npm install` in the `server` directory to install all the necessary backend packages.
-   **Installs Client Dependencies:** It runs `npm install` in the `client` directory to install all the necessary frontend packages.
-   **Starts the Servers:** It starts both the backend server and the frontend client in the background.

Once the script has finished, the application will be running.

-   The **backend server** will be available at `http://localhost:5000`.
-   The **frontend client** will be available at `http://localhost:3000`.

You can view the server logs in `server_setup.log` and the client logs in `client_setup.log`. It may take a few moments for the client to become available after the script completes.
