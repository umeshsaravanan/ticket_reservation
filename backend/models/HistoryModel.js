const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    username: { type: String, required: [true, 'Username is required'] },
    busId: { type: String, required: [true, 'Bus ID is required'] },
    bus: { type: mongoose.Schema.Types.Mixed, required: [true, 'Bus information is required'] }, // Assuming bus is an object
    choosenSeats: { type: [Number], required: [true, 'Chosen seats are required'] },
    cancelled: { type: Boolean, default: false, required: [true, 'Cancelled status is required'] },
    count: { type: Number, required: [true, 'Count of selected seats is required'] },
    total: { type: Number, required: [true, 'Total amount is required'] },
    createdAt: { type: Date, default: Date.now, required: [true, 'Creation date is required'] }
});

const History = mongoose.model('History', historySchema);

module.exports = History;
