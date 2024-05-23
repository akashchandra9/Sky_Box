# SkyBox

SkyBox is a comprehensive web application for file storage and management, developed using Node.js for the backend, React.js for the frontend, and MongoDB as the database. The application supports user authentication using JWT tokens and includes features like file upload, download, and deletion.

## Features

- **User Authentication**: Secure user registration and login using JWT tokens and bcrypt for password hashing.
- **File Management**: Users can upload, download, and delete files. Each user has a dedicated folder for file storage.
- **Password Management**: Includes functionality for password recovery and updates with strong password validation.
- **Responsive UI**: Built with React.js, providing a user-friendly and responsive interface.

## Project Structure

### Backend (Server)

The backend is built with Express.js and includes the following main components:

- **Server Setup**: Initializes the Express server and connects to MongoDB.
- **Authentication**: Manages user registration, login, and authentication using JWT.
- **File Handling**: Handles file uploads using Multer and provides endpoints for file management.
- **Routes**: Defines various API endpoints for authentication, file management, and password recovery.

### Frontend (Client)

The frontend is built with React.js and includes the following main components:

- **User Interface**: Pages for login, registration, password recovery, file upload, and file download.
- **Context Management**: Manages user state using React Context API.
- **Routing**: Uses React Router for navigating between different pages.

## Installation

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/akashchandra9/Sky_Box.git
    ```

2. **Install Dependencies**:
    ```sh
    cd server
    npm install
    cd ../client
    npm install
    ```

3. **Run the Application**:
    - Start the server:
        ```sh
        cd server
        node server.js
        ```
    - Start the client:
        ```sh
        cd client
        npm start
        ```

## Configuration

- **Database**: Ensure MongoDB is running and update the connection string in the `server.js` file.
- **Environment Variables**: Configure any required environment variables such as JWT secret and database connection strings.

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. 

For detailed information, refer to the individual component README files and the inline comments in the codebase.
