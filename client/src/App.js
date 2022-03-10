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
                console.log("update");
            } else {
                console.log("add");
            }
            toggleForm();
        } catch {
            console.log("erro)");
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
            {tasks && <TaskList tasks={tasks} toggleUpdate={toggleUpdate} />}
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
