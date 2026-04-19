const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /trips - Lists all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        if (!trips || trips.length === 0) {
            return res.status(404).json({ "message": "No trips found" });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// GET: /trips/:tripCode - Finds a single trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.find({ 'code': req.params.tripCode }).exec();
        if (!trip || trip.length === 0) {
            return res.status(404).json({ "message": "Trip not found" });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const q = await newTrip.save();

        if (!q) {
            return res.status(400).json({ "message": "Error saving trip" });
        } else {
            return res.status(201).json(q);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

// PUT: /trips/:tripCode - Updates an existing Trip
const tripsUpdateTrip = async (req, res) => {
    // console.log(req.params); // Debugging
    // console.log(req.body);   // Debugging

    try {
        const q = await Trip
            .findOneAndUpdate(
                { 'code': req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                { new: true } // Optional: returns the updated document instead of the old one
            )
            .exec();

        if (!q) {
            return res.status(404).json({ "message": "Trip not found" });
        } else {
            return res.status(201).json(q);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};