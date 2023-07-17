import { useState } from 'react';
import './App.scss';
import Todoform from './Components/Form/Todoform';
import List from './Components/Itemlist/Taskitem';


function App() {
  const [todoList, settodoList] = useState([])
  const [inputTxt, setinputTxt] = useState("")
  const [editTxt, seteditTxt] = useState("")
  const [editConfirmed, seteditConfirmed] = useState(false)
  
  // Add a new task to the todoList
  const addTodo = (ev) => {
        ev.preventDefault()
        if (inputTxt === "") return
        settodoList([...todoList,inputTxt])
  }

  // Get the input text
  const handleInput = (value) => {
    setinputTxt(value)
    console.log(inputTxt)
  }

  //Remove a task from the todoList
  const removeTask = (id) => {
    settodoList(todoList.filter((todo,index) => index !== id ? todo : null)) 
  }

  //Enable the task edit
  const editTask = (txt) => {
     seteditTxt(txt)
  }
  
  //confirm the edit

  const confirmEdit = (id,txt) => {
    settodoList(todoList.map((todo,index) => id == index ? txt : todo)) 

    console.log(todoList)

  }

  // Clear todo list at once
  const clearAll = (e) => {
    e.preventDefault()
    settodoList([])
  }
  return (
    <main className="App">
        <h1>Todo List</h1>
        <Todoform addTodo = {addTodo} changeInputTxt = {handleInput} todoList = {todoList}/>
        <List todoList = {todoList} removeTask = {removeTask} editTask = {editTask}  changeInputTxt = {handleInput} editTxt = {editTxt} confirmEdit = {confirmEdit} editTriggered = {editConfirmed}/>
        <button style = {{backgroundColor: "transparent", marginTop: "10px"}} onClick = {(e) => clearAll(e)}>clear all</button>
    </main>
  );
}

export default App;
