

import { useState} from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {

  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([]);

  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  const data = JSON.parse(localStorage.getItem("data") )|| []
  const [rerander , setRerander] = useState( false )

  // Add task 
  /////////////////////////// 
  const addTask = () => {
    if(newTask) {
      let num = data.length + 1; 
      let newEntry = { id: num, title: newTask, status: false }
      localStorage.setItem("data", JSON.stringify([...data , newEntry]));
      setRerander(newEntry)
      // setToDo([...toDo, newEntry])
      // setNewTask('');
    }
  }

  // Delete task 
  ///////////////////////////
  const deleteTask = (id) => {
    let newTasks = data.filter( task => task.id !== id)
    localStorage.setItem("data", JSON.stringify(newTasks));
    setRerander(newTasks)
    // setToDo(newTasks);
  }

  // Mark task as done or completed
  ///////////////////////////
  const markDone = (id) => {
    let newTask = data.map( task => {
      if( task.id === id ) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    localStorage.setItem("data", JSON.stringify(newTask));
    setRerander(newTask)
    // setToDo(newTask);
  }

  // Cancel update
  ///////////////////////////
  const cancelUpdate = () => {
    setUpdateData('');
  }

  // Change task for update
  ///////////////////////////
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    // localStorage.setItem("data", JSON.stringify(updatedObject));
    setUpdateData(newEntry);
  }

  // Update task
  ///////////////////////////
  const updateTask = () => {
    let filterRecords = [...data].filter( task => task.id !== updateData.id );
    let updatedObject = [...filterRecords, updateData]
    localStorage.setItem("data", JSON.stringify(updatedObject));
    setToDo(updatedObject);
    setUpdateData('');
  }

  return (
    <div className="container App">

    <br /><br />
    <h2>To Do List App (ReactJS)</h2>
    <br /><br />

    {updateData && updateData ? (
      <UpdateForm 
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}

    {/* Display ToDos */}

    {data && data.length ? '' : 'No Tasks...'}

    <ToDo
      toDo={data}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />  

    </div>
  );
}

export default App;

