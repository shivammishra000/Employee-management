# Employee Management System

A full-stack **Employee Management System** built using **React.js**, **Node.js**, **Express.js**, and **MongoDB**. The application provides secure user authentication and allows users to perform complete employee management operations, including adding, viewing, updating, and deleting employee records through an intuitive and responsive interface.

---

# Table of Contents

* Overview
* Features
* Technology Stack
* Project Architecture
* Folder Structure
* Installation Guide
* Environment Variables
* Running the Project
* API Endpoints
* Form Validation
* Authentication Flow
* Screens
* Future Enhancements
* Author

---

# Overview

The Employee Management System is designed to simplify employee record management by providing a secure and user-friendly web application.

The project implements:

* User Registration
* User Login
* JWT Authentication
* Employee CRUD Operations
* Form Validation
* Responsive Material UI Design
* REST API Integration
* Protected Routes

The application follows a client-server architecture where the React frontend communicates with an Express backend through REST APIs, while MongoDB stores user and employee information.

---

# Features

## User Authentication

* User Registration
* User Login
* JWT Token Generation
* Protected APIs
* Logout Functionality

## Employee Management

* View Employee List
* Add New Employee
* Edit Existing Employee
* Delete Employee
* Delete Confirmation Dialog
* Responsive Employee Data Grid

## Form Validation

Implemented using **Formik** and **Yup**.

Validation includes:

* Required Fields
* Valid Email Format
* Name accepts alphabetic characters only
* Contact Number accepts digits only
* Contact Number length validation
* Password validation
* Confirm Password matching

## User Interface

* Material UI Components
* Responsive Layout
* Consistent Typography
* Snackbar Notifications
* Navigation using React Router
* Dedicated pages for Add and Edit Employee

---

# Technology Stack

## Frontend

* React.js
* React Router DOM
* Material UI (MUI)
* Formik
* Yup
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt

---

# Project Architecture

```text
React Frontend
      │
      │ HTTP Requests (Axios)
      ▼
Express REST API
      │
      │ Mongoose
      ▼
MongoDB Database
```

---

# Folder Structure

```text
Employee-Management-System/

├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Registration.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── AddEmployee.jsx
│   │   │   └── EditEmployee.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Installation Guide

## Clone the Repository

```bash
git clone https://github.com/your-username/employee-management-system.git
```

## Frontend Setup

```bash
cd frontend
npm install
```

## Backend Setup

```bash
cd backend
npm install
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Running the Project

## Start Backend

```bash
npm start
```

or

```bash
node server.js
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:3000
```

---

# API Endpoints

## Authentication

### Register User

```
POST /api/user/register
```

### Login User

```
POST /api/user/login
```

---

## Employee

### Get All Employees

```
GET /api/employee
```

### Get Employee by ID

```
GET /api/employee/:id
```

### Add Employee

```
POST /api/employee/0
```

### Update Employee

```
PUT /api/employee/:id
```

### Delete Employee

```
DELETE /api/employee/:id
```

---

# Authentication Flow

1. User registers an account.
2. User logs in using email and password.
3. Backend validates credentials.
4. JWT token is generated.
5. Token is stored in local storage.
6. Protected requests send the token using the Authorization header.
7. User logs out by removing the stored token.

---

# Form Validation

## Registration

* Name is required
* Email must be valid
* Contact number accepts digits only
* Password minimum length validation
* Password complexity validation
* Confirm Password must match

## Add Employee

* Name validation
* Email validation
* Contact validation
* Required field validation

## Edit Employee

* Existing data pre-filled
* Validation before update

---

# Notifications

The application uses Material UI Snackbar components to display:

* Login Successful
* Registration Successful
* Employee Added Successfully
* Employee Updated Successfully
* Employee Deleted Successfully
* Validation Errors
* API Errors

---

# Security

* JWT Authentication
* Protected Backend Routes
* Password Hashing
* Token-based Authorization
* Client-side and Server-side Validation

---

# Screens

* Login Page
* Registration Page
* Employee Dashboard
* Add Employee Page
* Edit Employee Page
* Delete Confirmation Dialog

---

# Future Enhancements

* Search Employees
* Filter by Department
* Pagination
* Sorting
* User Roles (Admin/User)
* Profile Images
* Dark Mode
* Export Employee Data to Excel/PDF
* Dashboard Analytics

---

# Author

**Shivam Mishra**

Computer Science Engineering Student

* GitHub: https://github.com/shivammishra000
* LinkedIn: https://www.linkedin.com/in/shivam-mishra-38322b260/

---
![alt text](<Home Page.png>)

![alt text](<Login Page.png>)

![alt text](<Delete Employee.png>) 

![alt text](<Add Employee.png>) 

![alt text](<Edit Employee.png>)