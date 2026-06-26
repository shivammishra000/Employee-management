# Employee Management System

## Overview

The Employee Management System is a full-stack web application that allows users to securely manage employee records. It provides authentication and complete CRUD (Create, Read, Update, Delete) functionality with a modern and responsive user interface.

## Features

* User Registration and Login
* JWT-based Authentication
* View Employee List
* Add New Employee
* Edit Employee Details
* Delete Employee with Confirmation Dialog
* Form Validation using Formik and Yup
* Snackbar Notifications for Success and Error Messages
* Responsive UI built with Material UI
* REST API Integration using Axios

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Material UI (MUI)
* Formik
* Yup
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)

## Project Structure

```
frontend/
│── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Registration.jsx
│   │   ├── Home.jsx
│   │   ├── AddEmployee.jsx
│   │   └── EditEmployee.jsx
│   ├── services/
│   │   └── api.js
│   └── App.jsx

backend/
│── controllers/
│── models/
│── routes/
│── middleware/
│── server.js
```

## Installation

### Clone the repository

```bash
git clone https://github.com/shivammishra000/Employee-management
```

### Install frontend dependencies

```bash
cd frontend
npm install
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Start the frontend

```bash
npm run dev
```

### Start the backend

```bash
npm start
```

## Functionality

* Secure user authentication
* Employee management dashboard
* Add, edit, and delete employee records
* Client-side validation for forms
* Protected API requests using JWT
* User-friendly notifications and confirmation dialogs

## Future Improvements

* Search and filter employees
* Pagination and sorting
* Profile pictures for employees
* Role-based access control
* Dashboard analytics

## Author

**Shivam Mishra**

* GitHub: https://github.com/shivammishra000
* LinkedIn: https://www.linkedin.com/in/shivam-mishra-38322b260/
