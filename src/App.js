import React, { useState } from "react";
import "./App.css";
function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (task.trim()) {
            setTasks([{ text: task, completed: false, isEditing: false, selected: false }, ...tasks]);
            setTask("");
        }
    };
    const edit = (index) => {
        setTasks(tasks.map((t, i) =>
            i === index ? { ...t, isEditing: !t.isEditing } : t));
    };
    const updateTaskText = (index, newText) => {
        setTasks(tasks.map((t, i) =>
            i === index ? { ...t, text: newText } : t));
    };
    const deleteTask = (index) => {
        setTasks(p => {
            return p.filter((_, i) => i !== index)
        })
    };
    const deleteSelectedTasks = () => {
        setTasks(tasks.filter((t) => !t.selected));
    };
    const markSelctedTasks = () => {
        setTasks(t => t.map(d => d.selected ? { ...d, completed: !d.completed } : d));
    }
    return (
        <div className="app">

            <div className="fix">
                <h1>ToDo App</h1>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter your task:"
                        value={task}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addTask();
                            }
                        }}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button onClick={addTask}>Add</button>

                </div>
                <div className="shift">
                    <div className="toogle-container">
                        {tasks.filter((t) => t.selected).length > 0 && <div>
                            <button
                                onClick={markSelctedTasks}
                                disabled={!tasks.some((t) => t.selected)}
                                className="markRead">Mark as done
                            </button>
                        </div>}
                        {tasks.filter((t) => t.selected).length > 0 && <div>
                            <button
                                onClick={deleteSelectedTasks}
                                disabled={!tasks.some((t) => t.selected)}
                                className="deleteSelected">Delete
                            </button>
                        </div>}
                    </div>
                    <div>
                        <button
                            className="clear"
                            onClick={() => setTasks(tasks.filter(t => !t.completed))}>
                            Clear Completed
                        </button>
                    </div>
                </div>
            </div>

            <div className="scroll">
                {tasks.map((t, i) => (
                    <div key={i} className="task-item">
                        <input
                            type="checkbox"
                            checked={t.selected}
                            className="select"
                            onChange={() =>
                                setTasks(
                                    tasks.map((task, idx) =>
                                        idx === i ? { ...task, selected: !task.selected } : task
                                    )
                                )
                            }
                        />

                        {t.isEditing ? (
                            <input
                                type="text"
                                value={t.text}
                                className={t.isEditing ? "editing" : " "}
                                onChange={(e) => updateTaskText(i, e.target.value)} onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        edit(i);
                                    }
                                }}
                                onBlur={() => edit(i)}
                            />
                        ) : (
                            <span onClick={() => edit(i)} className="text-wrap">{t.text}</span>
                        )}
                        {t.completed && "✓"}
                        <div>
                            <a
                                href="#"
                                className="edit"
                                role="button"
                                tabIndex="0"
                                onClick={() => edit(i)}
                            >
                                ✎
                            </a>

                            {/* <a href="#" className="delete" onClick={() => deleteTask(i)}>Delete</a> */}
                            {/* <button className="edit" onClick={() => edit(i)}>Edit</button> */}
                            {/* <button className="delete" onClick={() => deleteTask(i)}>Delete</button> */}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default App;