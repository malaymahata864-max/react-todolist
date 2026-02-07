import { useState, useCallback } from 'react'
import './App.css'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

 
  const addTask = useCallback(() => {
    
    if (newTask.trim() !== "") {
      setTasks(prevTasks => [...prevTasks, newTask]);
      setNewTask("");
    }
  }, [newTask]);

  
  const deleteTask = useCallback((index) => {
    
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  }, []);


  const moveTaskUp = useCallback((index) => {
   
    if (index > 0) {
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index - 1]] = 
        [updatedTasks[index - 1], updatedTasks[index]];
        return updatedTasks;
      });
    }
  }, []);

 
  const moveTaskDown = useCallback((index) => {
    
    setTasks(prevTasks => {
      if (index < prevTasks.length - 1) {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index + 1]] = 
        [updatedTasks[index + 1], updatedTasks[index]];
        return updatedTasks;
      }
      return prevTasks;
    });
  }, []);

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          
        />
        <button className="add-button" onClick={addTask}><AddIcon/></button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <div className="button-group">
              <button className="delete-button" onClick={() => deleteTask(index)}><DeleteIcon/></button>
              <button className="move-button" onClick={() => moveTaskUp(index)}><ArrowUpwardIcon/></button>
              <button className="move-button" onClick={() => moveTaskDown(index)}><ArrowDownwardIcon/></button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
