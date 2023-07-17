import React from 'react'
import './Todoform.scss'

const Todoform = ({addTodo,changeInputTxt}) => {
    return (
        <form className = 'Todoform'>
            <fieldset className="inputField">
                <input type="text" placeholder="Add New Task" onChange = {(e) => changeInputTxt(e.target.value)}/>
                <button onClick = {(e) => addTodo(e)} type = "submit">Add Task</button>
            </fieldset>
        </form>
        
    )
}

export default Todoform
