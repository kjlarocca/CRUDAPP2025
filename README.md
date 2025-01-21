Inventory Management App

Overview
-The Inventory Management App is a full-stack application designed to help inventory managers create accounts, track inventory items, and manage their details. It supports user authentication, CRUD operations on items, and displays inventory details. Built with React (frontend), ExpressJS (backend), and MySQL (database).

Features
-User Registration and Login
-Create, View, Edit, and Delete Items
-User-specific inventory management
-Responsive design compatible with modern browsers

Tech Stack
- Frontend: React, React Router, Axios
- Backend: Node.js, Express.js, Sequelize
- Database: MySQL

Prerequisites
Before setting up the application, ensure you have the following installed on your system:

Node.js (v18 or later)
MySQL (v8 or later)
npm or yarn

Setup Instructions
Clone the Repository git clone (https://github.com/kjlarocca/CRUDApp2025.git)

Backend Setup 
A. Navigate to the backend folder: cd 
backend 
B. Install dependencies: npm install 
C. Create a .env file in the backend directory with the following content: DB_HOST=localhost DB_USER=your_mysql_user DB_PASSWORD=your_mysql_password DB_NAME=inventory_manager DB_PORT=3306 JWT_SECRET=your_jwt_secret PORT=5001 
D. Set up the database: Start your MySQL server Create the database: CREATE DATABASE inventory_manager; The application will automatically create the required tables when started 
E. Start the backend server: npm run dev The backend API will be available at http://localhost:5001

Frontend Setup 
A. Navigate to the frontend folder: cd ../frontend 
B. Install dependencies: npm install 
C. Create a .env file in the frontend directory with the following content: REACT_APP_API_URL=http://localhost:5001 
D. Start the React development server: npm start The frontend will be available at http://localhost:3000

Usage 
Open your browser and navigate to http://localhost:3000 
Register a new account or log in with an existing account Existing account for Inventory manager- Username: adminuser, Password: password123 After logging in, you will be redirected to the inventory page 
Use the interface to: Add a new item, view the details of existing items, edit item details, delete unwanted items
