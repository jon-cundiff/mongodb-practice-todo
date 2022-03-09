require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task");

const PORT = process.env.PORT || 5500;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json({ todos: tasks });
    } catch {
        res.status(400).json({ error: "Error loading tasks" });
    }
});

app.post("/new-task", async (req, res) => {
    const { title, priority, completedDate } = req.body;
    try {
        const newTask = new Task({ title, priority, completedDate });
        const task = await newTask.save();
        res.json({
            success: true,
            message: "Task saved successfully",
            data: task,
        });
    } catch {
        res.status(400).json({ success: false, message: "Error saving task." });
    }
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB.");
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
});
