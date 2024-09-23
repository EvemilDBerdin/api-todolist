# api-todolist
API Todo List System Report (Node.js, Sequelize, Express, MySQL)

Project Overview

The API Todo List System is a backend application built using Node.js, Express, Sequelize, and MySQL. It allows users to manage their todo lists while implementing security and token-based authentication. This project follows the MVC (Model-View-Controller) architecture and uses Sequelize ORM for database management and relationships. Authentication is handled using JWT (JSON Web Token), and token-based authorization is implemented to restrict access to user-specific data.
Dependencies

The following dependencies were used in this project:
    bcryptjs: For hashing and comparing passwords securely.
    cors: To handle Cross-Origin Resource Sharing (CORS), allowing the API to be accessed from various domains.
    crypto: For generating secure tokens and random values.
    dotenv: To manage environment variables.
    express: The web framework for building the API.
    jsonwebtoken: For creating and verifying JWT tokens.
    mysql2: MySQL driver for connecting to the MySQL database.
    sequelize: ORM for database interaction and management.

MVC Structure

The application follows the MVC pattern for better separation of concerns:

    Controllers:
        auth.js: Handles user authentication (login, registration) and token management.
        todoitem.js Handles the todoitem controller CRUD
        user.js Handles the user controller CRUD

    Middlewares:
        auth.js: Verifies the validity of the JWT token to authorize access to certain routes.
        validateJwt.js handles the validation

    Migrations:
        Defines and manages the database schema and structure for the Users and TodoItems tables.

    Models:
        User.js: Defines the User model with attributes: firstName, lastName, email, username, password, phoneNumber, and token.
        TodoItem.js: Defines the TodoItem model with attributes: title, description, dueDate, user_id, and status.

    Routes:
        Routes are defined to handle user registration, login, and CRUD operations for todo items. All routes related to TodoItems require the user to be authenticated with a valid token.

    Seeders:
        Seeders are used to prepopulate the database with sample data for testing purposes.
        demo-user and Todo-item

    Utils:
        jwtGenerator.js: Utility functions to generate and verify JWT tokens.

    .env File:
        Stores sensitive configuration data like the database credentials, secret keys for JWT, and other environment-specific variables.

Database Structure

The system uses two main tables with relationships between them:

    Users Table (hasMany relationship with TodoItems):
        id: Auto-increment primary key.
        firstName: User's first name.
        lastName: User's last name.
        email: Unique email address.
        username: Unique username.
        password: Hashed password using bcryptjs.
        phoneNumber: User's phone number.
        token: JWT token for authentication.
        
    TodoItems Table (belongsTo relationship with Users):
        id: Auto-increment primary key.
        title: Title of the todo item.
        description: Detailed description of the task.
        dueDate: Due date of the todo item.
        status: Status of the todo item (e.g., pending, completed).
        user_id: Foreign key, references the id in the Users table.

Authentication and Authorization

    User Token:
        Each user has a JWT token generated during login. This token is required for accessing any todo item-related routes.
        The token is stored in the user's token field and expires after 1 day.

    Authorization:
        Middleware is implemented to verify the token before granting access to any todo item operations. If the token is invalid or expired, the API denies access.

Security

    Password Hashing:
        The application uses bcryptjs to hash passwords before storing them in the database. This ensures that user passwords are not stored in plain text.

    JWT Token:
        JWT tokens are used for authentication and are signed using a secret stored in the .env file.
        The token is valid for 1 day and must be provided in the Authorization header to access protected routes.

Database Relations

    Users have many TodoItems:
        This relationship is established using Sequelize's hasMany method. A user can have multiple todo items associated with them.

    TodoItems belong to Users:
        This relationship is established using Sequelize's belongsTo method. Each todo item is linked to a user via the user_id foreign key.
