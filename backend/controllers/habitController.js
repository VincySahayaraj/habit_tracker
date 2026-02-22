const Habit = require('../models/Habit');

// @desc    Get all habits
// @route   GET /api/habits
// @access  Public
const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find();
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a habit
// @route   POST /api/habits
// @access  Public
const createHabit = async (req, res) => {
    try {
        const { name, title, frequency } = req.body;

        // Ensure at least name or title is provided
        if (!name && !title) {
            return res.status(400).json({ message: 'Please provide a habit name or title' });
        }

        const habit = await Habit.create({
            name,
            title,
            frequency
        });

        res.status(201).json(habit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Remove a habit
// @route   DELETE /api/habits/:id
// @access  Public
const removeHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        await habit.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle habit completion status
// @route   PUT /api/habits/:id/toggle
// @access  Public
const toggleHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        const { date } = req.body;

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        if (date) {
            // Logic for completedDates array
            const index = habit.completedDates.indexOf(date);
            if (index > -1) {
                habit.completedDates.splice(index, 1);
            } else {
                habit.completedDates.push(date);
            }
        } else {
            // Simple toggle for 'completed' boolean
            habit.completed = !habit.completed;
        }

        await habit.save();
        res.status(200).json(habit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getHabits,
    createHabit,
    removeHabit,
    toggleHabit
};
