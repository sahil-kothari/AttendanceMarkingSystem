const mongoose = require('mongoose')

const Timetable = mongoose.Schema({
    slots: Array,
    subjects: Object,
});

module.exports = mongoose.model('Timetable', Timetable);