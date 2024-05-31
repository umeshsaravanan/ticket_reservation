const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'Username is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
    pwd: { type: String, required: [true, 'Password is required'], minlength: [6, 'Password must be at least 6 characters long'] },
    role: {type: String}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
