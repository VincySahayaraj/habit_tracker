const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a habit name']
    },
    title: { // Keeping both title and name for compatibility
        type: String
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly'],
        default: 'daily'
    },
    completedDates: {
        type: [String],
        default: []
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to sync title if name is provided (or vice versa)
habitSchema.pre('save', function (next) {
    if (this.name && !this.title) {
        this.title = this.name;
    } else if (this.title && !this.name) {
        this.name = this.title;
    }
    next();
});

module.exports = mongoose.model('Habit', habitSchema);
