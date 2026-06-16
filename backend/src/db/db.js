const mongoose = require('mongoose');
function connectDB() {
    mongoose.connect('mongodb+srv://koushikch3333_db_user:bI8XsOT42JjOEBbz@cluster0.uczgmnq.mongodb.net/hungry_bites')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
}
module.exports = connectDB;