import React, { useState, useEffect } from "react";

export default function ToDosample() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  useEffect(() => {
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    setCurrentDay(daysOfWeek[today]);
  }, []); 

  function addTask() {
    if (inputTask.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputTask,
      };

      setTasks([...tasks, newTask]);
      setInputTask("");
    }
  }

  function deleteTask(id) {
    let decision=window.confirm("are you sure?")
    if(decision){
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    }
    else{
      console.log('')
    }
  }

  function editTask(id, newText) {
    const taskToEdit = tasks.find((task) => task.id === id);
    taskToEdit.text = newText;

    setTasks([...tasks]);
    setEditingTaskId(null);
    setEditedTaskText("");
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>React To-Do App</h1>
      </div>
      <hr/>
      <div className="subHeading">
        <br />
        <h2>Heyy, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="🖊️ Add task..."
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.id === editingTaskId ? (
              <div>
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                />
                <button onClick={() => editTask(task.id, editedTaskText)}>
                  Save
                </button>
              </div>
            ) : (
              <div className="textPrint">
                {task.text}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditedTaskText(task.text);
                  }}
                > Edit </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
