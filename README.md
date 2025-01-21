Inventory Management App

Overview <br>
The Inventory Management App is a full-stack application designed to help inventory managers create accounts, track inventory items, and manage their details. It supports user authentication, CRUD operations on items, and displays inventory details. Built with React (frontend), ExpressJS (backend), and MySQL (database).

Features
-User Registration and Login
-Create, View, Edit, and Delete Items
-User-specific inventory management
-Responsive design compatible with modern browsers

Tech Stack
- Frontend: React, React Router, Axios
- Backend: Node.js, Express.js, Sequelize
- Database: MySQL

Prerequisites <br>
Before setting up the application, ensure you have the following installed on your system:

- Node.js (v18 or later)
- MySQL (v8 or later)
- npm or yarn

Setup Instructions <br>
1. Clone the Repository git clone (https://github.com/kjlarocca/CRUDApp2025.git)

2. Backend Setup <br>
A. Navigate to the backend folder: cd backend <br> 
B. Install dependencies: npm install <br>
C. Create a .env file in the backend directory with the following content: <br>
DB_HOST=localhost <br>
DB_USER=inventory_user <br>
DB_PASSWORD=your_password <br>
DB_NAME=inventory_manager <br>
DB_PORT=5001 <br>
JWT_SECRET=your_jwt_secret <br>
D. Set up the database: Start your MySQL server using terminal command: mysql -u inventory_user -p and password: your_password <br>
E. Start the backend server: npm run dev <br>
The backend API will be available at http://localhost:5001

3. Frontend Setup <br>
A. Navigate to the frontend folder: cd ../frontend <br>
B. Install dependencies: npm install <br>
C. Create a .env file in the frontend directory with the following content: REACT_APP_API_URL=http://localhost:5001 <br>
D. Start the React development server: npm start The frontend will be available at http://localhost:3000

Usage <br>
Open your browser and navigate to http://localhost:3000 <br>
Register a new account or log in with an existing Inventory Manager account (Username: adminuser, Password: password123) <br>
After logging in, you will be redirected to the inventory page <br>
Use the interface to: Add a new item, view the details of existing items, edit item details, delete unwanted items
