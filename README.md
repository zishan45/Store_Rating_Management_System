# Store Rating Management System

A full-stack web application that allows users to discover stores, submit ratings, and manage their ratings. The system also provides role-based dashboards for **System Administrators** and **Store Owners** to manage users, stores, and rating-related information.

## Features

### User
- User registration and login
- Secure authentication using JWT
- View available stores
- Search and browse stores
- Submit ratings from 1 to 5
- Update existing ratings
- View personal rating information

### Store Owner
- Secure owner login
- View owned store information
- View ratings submitted by users
- View average store rating
- Monitor customer ratings

### System Administrator
- Secure administrator login
- Manage users
- Create and manage stores
- View store information
- View registered users
- Manage system data
- Role-based access control

## Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- REST API
- JWT Authentication

### Database
- MySQL

### Development Tools
- Git
- GitHub
- VS Code
- npm

## Project Structure

```text
Store_Rating_Management_System/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── database/
│   ├── database.sql
│   ├── users.sql
│   ├── stores.sql
│   └── ratings.sql
│
└── README.md
```

## Database Design

The application uses three main tables:

### Users

Stores information about system users.

Important fields:

```text
id
name
email
password
address
role
created_at
updated_at
```

Supported roles:

```text
admin
owner
user
```

### Stores

Stores information about registered stores.

```text
id
name
email
address
owner_id
created_at
updated_at
```

`owner_id` establishes a relationship between a store and its owner.

### Ratings

Stores ratings submitted by users.

```text
id
user_id
store_id
rating
created_at
updated_at
```

Ratings are restricted to values between **1 and 5**.

A user can submit only one rating for a particular store and can update the existing rating.

## Database Relationships

```text
Users
  │
  ├───────────────┐
  │               │
  │ owner_id      │ user_id
  ▼               ▼
Stores         Ratings
                  │
                  │ store_id
                  ▼
                Stores
```

## Installation

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd Store_Rating_Management_System
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=store_rating_db

JWT_SECRET=your_secret_key
```

Update the database credentials according to your MySQL configuration.

### 3. Database Setup

Open MySQL and create/import the database using:

```text
database/database.sql
```

The database will contain:

- `users`
- `stores`
- `ratings`

### 4. Start the Backend

```bash
npm run dev
```

The backend server will run on:

```text
http://localhost:5000
```

### 5. Frontend Setup

Open another terminal:

```bash
cd frontend
```
