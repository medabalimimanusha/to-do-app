import React, { useState } from 'react';
import '../App.css';

function Home() {
  const [task, setTask] = useState(''); // Input field value
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] }); // Task categories

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };
  const clearTasks = (category) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [] 
    }));
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask(''); // Clear input
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      // Remove task from current category
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      );
      // Add task to target category
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

   // Delete task from any category
   const deleteTask = (category, taskToDelete) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[category] = prevTasks[category].filter((t) => t !== taskToDelete);
      return updatedTasks;
    });
  };
   // Clear all tasks from all categories
   const clearAllTasks = () => {
    setTasks({ todo: [], ongoing: [], completed: [] });
  };


  return (
    <div className="home">
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form reload
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button 
          type="button"
          className="add-task-button"
          onClick={addTask}
        >
          ADD TASK
        </button>
        <span className="button-spacer"></span> {/* Add a spacer element */}
        <button type="button" className="clear-all-button" onClick={clearAllTasks}>
          CLEAR ALL
        </button>
      </form>
      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <h2>To-Do Tasks</h2>
          <ul>
            {tasks.todo.map((t, index) => (
              <li key={index}>
                {t}
                <button className="move-button" // Apply the move-button class
                  onClick={() => moveTask('todo', 'ongoing', t)}>
                  Move to Ongoing
                </button>

                <button className="move-button" // Apply the move-button class
                  onClick={() => moveTask('todo', 'completed', t)}>
                  Move to Completed
                </button>

                <button className="move-button delete-button" // Apply the move-button class
                 onClick={() => deleteTask('todo', t)}>
                  Delete
                 </button>
                 
              </li>
            ))}
          </ul>
          <button className="clear-section-button" onClick={() => clearTasks('todo')}>Clear All</button>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <h2>Ongoing Tasks</h2>
          <ul>
            {tasks.ongoing.map((t, index) => (
              <li key={index}>
                {t}
                <button className="move-button"
                  onClick={() => moveTask('ongoing', 'todo', t)}
                >
                  Move to To-Do
                </button>
                <button className="move-button"
                  onClick={() => moveTask('ongoing', 'completed', t)}
                >
                  Move to Completed
                </button>
                <button className="move-button delete-button"
                 onClick={() => deleteTask('ongoing', t)}>Delete</button>
              </li>
            ))}
          </ul>
          <button className="clear-section-button" onClick={() => clearTasks('completed')}>Clear All</button>
        </div>
        {/* Completed Section */}
        <div className="task-section">
          <h2>Completed Tasks</h2>
          <ul>
            {tasks.completed.map((t, index) => (
              <li key={index}>
                {t}
                <button className="move-button"
                  onClick={() => moveTask('completed', 'todo', t)}
                >
                  Move to To-Do
                </button>
                <button className="move-button"
                  onClick={() => moveTask('completed', 'ongoing', t)}
                >
                  Move to Ongoing
                </button>
                <button className="move-button delete-button"
                 onClick={() => deleteTask('completed', t)}>Delete</button>
              </li>
            ))}
          </ul>
          <button className="clear-section-button" onClick={() => clearTasks('completed')}>Clear All</button>
        </div>
      </div>
    </div>
  );
}

export default Home;