const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busName: { type: String, required: [true, 'Bus name is required'] },
  start: { type: String, required: [true, 'Start location is required'] },
  end: { type: String, required: [true, 'End location is required'] },
  startTime: { type: Number, required: [true, 'Start time is required'] },
  endTime: { type: Number, required: [true, 'End time is required'] },
  travelHrs: { type: Number, required: [true, 'Travel hours are required'] },
  ticketPrice: { type: Number, required: [true, 'Ticket price is required'] },
  id: { type: String, required: [true, 'ID is required'] },
  type: { type: String, enum: { values: ['seater', 'sleeper'], message: 'Type must be either "seater" or "sleeper"' }, required: [true, 'Type is required'] },
  date: { type: Date, required: [true, 'Date is required'] },
  startCo: {
    lat: { type: Number, required: [true, 'Start latitude is required'] },
    lng: { type: Number, required: [true, 'Start longitude is required'] },
  },
  endCo: {
    lat: { type: Number, required: [true, 'End latitude is required'] },
    lng: { type: Number, required: [true, 'End longitude is required'] },
  },
  availableSeats: {
    type: [Number], validate: {
      validator: function (arr) {
        return arr.length === 32;
      },
      message: 'Available seats must be an array of 32 zeros'
    }, required: [true, 'Available seats are required']
  }
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
