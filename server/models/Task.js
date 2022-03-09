const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: String,
    priority: String,
    completedDate: Date,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
