#!/bin/bash

echo "🚀 Setting up Family Tree Portal..."

# Create environment file for frontend
echo "REACT_APP_API_URL=http://localhost:8080/api" > frontend/.env

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies and run
echo "☕ Setting up backend..."
cd backend

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven first."
    echo "   On macOS: brew install maven"
    echo "   On Ubuntu: sudo apt install maven"
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17+ first."
    echo "   On macOS: brew install openjdk@17"
    echo "   On Ubuntu: sudo apt install openjdk-17-jdk"
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""
echo "🎯 To run the application:"
echo ""
echo "1. Start the backend (in one terminal):"
echo "   cd backend && mvn spring-boot:run"
echo ""
echo "2. Start the frontend (in another terminal):"
echo "   cd frontend && npm start"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📝 Make sure MySQL is running and create a database named 'family_tree_db'"
