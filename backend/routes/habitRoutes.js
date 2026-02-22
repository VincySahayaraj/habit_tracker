const express = require('express');
const router = express.Router();
const {
    getHabits,
    createHabit,
    removeHabit,
    toggleHabit
} = require('../controllers/habitController');

router.route('/')
    .get(getHabits)
    .post(createHabit);

router.route('/:id')
    .delete(removeHabit);

router.put('/:id/toggle', toggleHabit);

module.exports = router;
