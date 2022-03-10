import React from "react";

const TaskList = ({ tasks, toggleUpdate, handleDelete }) => {
    const taskItems = tasks.map((task, index) => {
        return (
            <li key={task._id}>
                <h3>{task.title}</h3>
                <p>{task.priority}</p>
                {task.completedDate && (
                    <p>
                        Completed on <i>{task.completedDate}</i>
                    </p>
                )}
                <button onClick={() => toggleUpdate(index)}>Update</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
        );
    });
    return <ul>{taskItems}</ul>;
};

export default TaskList;
