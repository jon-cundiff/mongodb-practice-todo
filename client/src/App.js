import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TaskList from "./Components/TaskList";
import TaskForm from "./Components/TaskForm";

const baseURL = process.env.REACT_APP_BASE_URL;

function App() {
    const [tasks, setTasks] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [task, setTask] = useState(null);

    const getTasks = async () => {
        const tasksResp = await axios.get(baseURL);
        setTasks(tasksResp.data.todos);
    };

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const toggleUpdate = (index) => {
        setTask(tasks[index]);
        toggleForm();
    };

    const handleSubmit = async (taskData) => {
        try {
            if (task) {
                await axios.put(`${baseURL}/update-task`, taskData);
            } else {
                await axios.post(`${baseURL}/new-task`, taskData);
            }
            toggleForm();
            setTask(null);
            getTasks();
        } catch {
            console.log("error");
        }
    };

    const handleDelete = async (index) => {
        try {
            const taskId = tasks[index]._id;
            await axios.delete(`${baseURL}/delete-task`, {
                data: { id: taskId },
            });
            getTasks();
        } catch {
            console.log("error");
        }
    };

    useEffect(() => {
        if (!tasks) {
            getTasks();
        }
    }, [tasks]);

    return (
        <div className="App">
            <h1>Task List</h1>
            <button onClick={toggleForm}>New Task</button>
            {tasks && (
                <TaskList
                    tasks={tasks}
                    toggleUpdate={toggleUpdate}
                    handleDelete={handleDelete}
                />
            )}
            {isFormVisible && (
                <TaskForm
                    task={task}
                    closeForm={toggleForm}
                    submitTask={handleSubmit}
                />
            )}
        </div>
    );
}

export default App;
