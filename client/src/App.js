import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TaskList from "./Components/TaskList";

const baseURL = process.env.REACT_APP_BASE_URL;

function App() {
    const [tasks, setTasks] = useState(null);

    const getTasks = async () => {
        const tasksResp = await axios.get(baseURL);
        setTasks(tasksResp.data.todos);
    };

    useEffect(() => {
        if (!tasks) {
            getTasks();
        }
    }, [tasks]);

    return (
        <div className="App">
            <h1>Task List</h1>
            {tasks && <TaskList tasks={tasks} />}
        </div>
    );
}

export default App;
