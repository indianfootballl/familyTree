# Family Tree Portal

A comprehensive family hierarchy portal built with React frontend and Spring Boot backend.

## 🚀 Quick Start

### Prerequisites
- **Node.js 16+** and npm
- **Java 17+**
- **MySQL 8.0+**
- **Maven 3.6+**

### 1. Setup Database
```sql
CREATE DATABASE family_tree_db;
```

### 2. Run Setup Script
```bash
chmod +x setup.sh
./setup.sh
```

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

**Open:** http://localhost:3000

## 🔧 Troubleshooting

### Backend Issues

**Problem: Port 8080 already in use**
```bash
# Find process using port 8080
lsof -i :8080
# Kill the process
kill -9 <PID>
```

**Problem: MySQL connection failed**
1. Make sure MySQL is running: `brew services start mysql` (macOS) or `sudo service mysql start` (Linux)
2. Update database credentials in `backend/src/main/resources/application.yml`

**Problem: Maven build failed**
```bash
# Clean and rebuild
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Issues

**Problem: npm install failed**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem: Port 3000 already in use**
```bash
# React will ask to use a different port, press Y
# Or kill the process using port 3000
lsof -i :3000
kill -9 <PID>
```

**Problem: API connection failed**
1. Make sure backend is running on port 8080
2. Check if `REACT_APP_API_URL=http://localhost:8080/api` is in `frontend/.env`

## 📁 Project Structure

```
familyTree/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── App.tsx        # Main app component
│   ├── package.json
│   └── tailwind.config.js
├── backend/                # Spring Boot backend
│   ├── src/main/java/com/familytree/
│   │   ├── entity/        # JPA entities
│   │   ├── repository/    # Data repositories
│   │   ├── service/       # Business logic
│   │   ├── controller/    # REST controllers
│   │   ├── dto/          # Data transfer objects
│   │   ├── security/     # Security configuration
│   │   └── util/         # Utility classes
│   └── pom.xml
├── setup.sh               # Setup script
└── README.md
```

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Hook Form** for forms
- **React Hot Toast** for notifications

### Backend
- **Spring Boot 3.2.0** with Java 17
- **Spring Security** with JWT
- **Spring Data JPA** with Hibernate
- **MySQL** database
- **Maven** for dependency management

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/search?q={query}` - Search users

## 🗄 Database Schema

The application will automatically create these tables:

```sql
-- Users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    profile_photo VARCHAR(255),
    bio TEXT,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Relations table
CREATE TABLE relations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    parent_id BIGINT NOT NULL,
    child_id BIGINT NOT NULL,
    relation_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (child_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_relation (parent_id, child_id, relation_type)
);

-- Comments table
CREATE TABLE comments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    author_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🚨 Common Issues & Solutions

### 1. "Cannot find module" errors
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### 2. "Port already in use" errors
```bash
# For port 3000 (React)
lsof -i :3000
kill -9 <PID>

# For port 8080 (Spring Boot)
lsof -i :8080
kill -9 <PID>
```

### 3. "Database connection failed"
1. Start MySQL: `brew services start mysql` (macOS)
2. Create database: `CREATE DATABASE family_tree_db;`
3. Update credentials in `application.yml`

### 4. "Maven not found"
```bash
# macOS
brew install maven

# Ubuntu
sudo apt install maven
```

### 5. "Java not found"
```bash
# macOS
brew install openjdk@17

# Ubuntu
sudo apt install openjdk-17-jdk
```

## 📱 Features

- ✅ Phone-based authentication
- ✅ User profile management
- ✅ Family relationship management
- ✅ Search functionality
- ✅ JWT security
- ✅ Responsive design

## 🎯 Next Steps

1. Run the setup script: `./setup.sh`
2. Start backend: `cd backend && mvn spring-boot:run`
3. Start frontend: `cd frontend && npm start`
4. Open http://localhost:3000
5. Register a new account and start building your family tree!

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Make sure all prerequisites are installed
3. Verify MySQL is running and database exists
4. Check console logs for specific error messages
