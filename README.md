# Store_Rating_Management_System
Developed a full-stack Store Rating Management System using React.js, Express.js, and MySQL.   Implemented role-based access for Admin, Store Owner, and Users with store and rating management.   Users can rate stores, while owners and admins can monitor and manage ratings through dashboards.
# Store Rating Management System

A full-stack Web application for managing stores, users, and customer ratings through a centralized platform.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Express.js, Node.js
- **Database:** MySQL
- **API:** RESTful APIs

## Features

- User registration and login
- Role-based access control
- Admin, Store Owner, and User roles
- Store listing and management
- Submit and update store ratings
- Average store rating calculation
- Store owner dashboard
- Admin dashboard
- User and rating management
- MySQL database integration

## Project Structure

```text
store-rating-management/
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── database/
│   └── schema.sql
│
└── README.md
```

## Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd store-rating-management
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_db
```

### 5. Setup MySQL Database

Create the database:

```sql
CREATE DATABASE store_rating_db;
```

Then import or execute the SQL schema provided in the `database` folder.

### 6. Start the Backend

```bash
cd backend
npm run dev
```

### 7. Start the Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

## User Roles

### Admin
- Manage users
- Add, update, and delete stores
- Monitor ratings
- Manage the overall platform

### Store Owner
- View store details
- Monitor customer ratings
- View average store rating
- Manage store-related information

### User
- Browse stores
- Search for stores
- Submit ratings
- Update ratings
- View
