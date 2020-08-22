const lessonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    day: {
        type: String,
        enum: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']
    },
    start: {
        type: Date
    }
    end: {
        type: Date
    }
});

module.exports = mongoose.model('Lesson', lessonSchema);