#!/bin/bash
echo "Initial script will setup npm packages for backend and frontend."

echo "Install root dependencies..."
npm install

echo "Install backend dependencies..."
(cd ./backend && npm install)

echo "Install frontend dependencies..."
(cd ./frontend && npm install)

echo "Build frontend sources"
(cd ./frontend && npm run build)

echo "Process is finished."
