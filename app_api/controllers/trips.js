const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
  const q = await Model
    .find({}) // No filter, return all records
    .exec();

  if (!q) {
    return res
      .status(404)
      .json({ "message": "No trips found" });
  } else {
    return res
      .status(200)
      .json(q);
  }
};

// GET: /trips/:tripCode - lists a single trip
// This is the new function highlighted in your image
const tripsFindByCode = async (req, res) => {
  const q = await Model
    .find({ 'code': req.params.tripCode }) // Filter by the tripCode parameter
    .exec();

  if (!q || q.length === 0) { // Check if data was actually found
    return res
      .status(404)
      .json({ "message": "Trip not found" });
  } else {
    return res
      .status(200)
      .json(q);
  }
};

// Ensure both functions are exported
module.exports = {
  tripsList,
  tripsFindByCode
};