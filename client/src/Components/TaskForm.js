import React, { useState } from "react";

import styles from "./TaskForm.module.css";

const TaskForm = ({ task, closeForm, submitTask }) => {
    const completedDate = task ? task.completedDate : "";
    const [taskState, setTaskState] = useState({
        title: task ? task.title : "",
        priority: task ? task.priority : "",
        completedDate: completedDate ? completedDate.substring(0, 10) : "",
    });

    const onBackDropClick = (e) => {
        if (e.target.className.includes("backdrop")) {
            closeForm();
        }
    };

    const handleInputChange = (e) => {
        setTaskState({
            ...taskState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        const taskInfo = { ...taskState };
        if (taskInfo.completedDate === "") taskInfo.completedDate = null;
        if (task) taskInfo.id = task._id;

        submitTask(taskInfo);
    };

    return (
        <div className={styles.backdrop} onClick={onBackDropClick}>
            <main className={styles["task-box"]}>
                <h2>{task ? "Update" : "New"} Task</h2>
                <section>
                    <h3>Title</h3>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={taskState.title}
                        onChange={handleInputChange}
                    />
                </section>
                <section>
                    <h3>Priority</h3>
                    <select
                        name="priority"
                        value={taskState.priority}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a priority level</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </section>
                <section>
                    <h3>Completed Date</h3>
                    <input
                        type="date"
                        name="completedDate"
                        placeholder="Completed Date"
                        value={taskState.completedDate}
                        onChange={handleInputChange}
                    />
                </section>
                <button onClick={handleSubmit}>
                    {task ? "Update" : "Add"} Task
                </button>
            </main>
        </div>
    );
};

export default TaskForm;
