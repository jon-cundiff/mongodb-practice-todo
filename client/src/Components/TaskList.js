import React from "react";

const TaskList = ({ tasks }) => {
    const taskItems = tasks.map((task) => {
        return (
            <li key={task._id}>
                <h3>{task.title}</h3>
                <p>{task.priority}</p>
                {task.completedDate && (
                    <p>
                        Completed on <i>{task.completedDate}</i>
                    </p>
                )}
            </li>
        );
    });
    return <ul>{taskItems}</ul>;
};

export default TaskList;
