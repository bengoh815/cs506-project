# Backend Server Documentation

## Table of Contents

- [File Structure](#file-structure)
- [Run the Server](#run-the-server)
- [Run Tests](#run-tests)

## File Structure

The backend server is structured using the Model-View-Controller (MVC) architecture for improved maintainability. The key components of the file structure are:

- `models/`: Contains the data models for the application.
- `routes/`: Contains the routes that handle client requests and return responses.
- `controllers/`: Contains the logic that connects the models and routes.
- `utils/`: Contains utility functions and classes, such as audio file to MIDI conversion tools.

## Run the Server

To start the backend server, navigate to the project's server directory and run the following command:

```bash
python run.py
```

## Run Tests

To run the automated tests for the backend server, navigate to the project's server directory and run the following command:

```
python -m pytest
```
