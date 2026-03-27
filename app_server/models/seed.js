// Bring in the DB connection and the Trip schema
const mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from JSON file
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Function to seed the database
const seedDB = async () => {
  try {
    // Delete existing records
    await Trip.deleteMany({});
    
    // Insert new seed data
    await Trip.insertMany(trips);

    console.log('Database successfully seeded');
  } catch (err) {
    console.log('Error seeding database:', err);
  }
};

// Run the seed function and close connection
seedDB().then(async () => {
  await mongoose.connection.close();
  process.exit(0);
});