const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport'); // New: Part 1

// ... (keep your existing register method here) ...

// New: Part 2 - The Login Method
const login = (req, res) => {
    // Validate message to ensure that email and password are present.
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }

    // Delegate authentication to passport module
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Error in Authentication Process (e.g., database connection issues)
            return res
                .status(404)
                .json(err);
        }

        if (user) { 
            // Auth succeeded - generate JWT and return to caller
            const token = user.generateJWT();
            res
                .status(200)
                .json({token});
        } else { 
            // Auth failed (e.g., wrong password or user not found)
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};

// Part 3: Updated Exports
module.exports = {
    register,
    login
};