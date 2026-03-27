const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const readLine = require('readline');

// Function to establish a connection to MongoDB
// Uses a short delay to ensure the server is ready before connecting
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI), 1000);
};

// Event listener for successful connection
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

// Event listener for connection errors
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ', err);
});

// Event listener for disconnection
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows-specific workaround to capture SIGINT signal
if (process.platform === 'win32') {
  const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  r1.on('SIGINT', () => {
    process.emit("SIGINT");
  });
}

// Function to gracefully close the MongoDB connection
const gracefulShutdown = (msg) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
  });
};

// Handle nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

// Handle app termination (Ctrl+C)
process.on('SIGINT', () => {
  gracefulShutdown('app termination');
  process.exit(0);
});

// Handle container shutdown
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
  process.exit(0);
});

// Initialize database connection
connect();

// Import the Trip schema so it is registered with Mongoose
require('./travlr');

module.exports = mongoose;