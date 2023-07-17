import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState} from 'react'
import { faTrashCan,faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import './Taskitem.scss'

const Edititem = (props) => {
    const [value, setvalue] = useState(props.itemTxt)

    return (
        <li className = "editInput">
            <input type="text" placeholder = "Edit the task" onChange = {(e) => setvalue(e.target.value)} />
            <button onClick = {() => props.handleEditEnabled(props.taskId, value)}>Edit Item</button>
        </li>
    )
}


const Taskitem = (props) => {
    
    return (
        <li className = {`Taskitem ${props.taskDone ? "taskDone" :""}`} >
            <span>{props.itemTxt}</span>
            <section>

                {/* Button to edit the text */}
                <button onClick = {() => props.handleEditEnabled()}>
                    <FontAwesomeIcon icon={faPenToSquare} className="btnIcons"/>
                </button> 

                {/* Button to delete the item */}
                <button onClick = {() => props.removeTask(props.taskId)}>
                    <FontAwesomeIcon icon={faTrashCan} className="btnIcons"/>
                </button> 

                {/* Button to mark the task as completed */}
                <button onClick = {() => props.handleTaskDone()}>
                    {!props.taskDone && <span>Done</span>}
                    {props.taskDone && <span style = {{zIndex: 100, opacity: 1}}>Undo</span>}
                </button>
            </section>
        </li>  
    )
}

const Taskcontainer = (props) => {
    const [editEnabled, seteditEnabled] = useState(false)
    const [taskDone, settaskDone] = useState(false)
    
    // Function that enables the edit of task
    const handleClickEditEnabled = (id,txt) => {
        if (txt !== "") {
            seteditEnabled(!editEnabled)
            props.confirmEdit(id,txt)
        } else return
        
    }
        
    // // Function to confirm a task done or undo the action
    const handleTaskDone = () => settaskDone(!taskDone)

    // Function to update the task txt after changed

    const taskTxtChanged = (id,txt) => {
        if (txt !== "") {
            props.confirmEdit(id,txt)
            
        } else return
    }
    
    return (
        <>
            {!editEnabled && <Taskitem 
                taskId = {props.taskId} 
                removeTask = {props.removeTask} 
                itemTxt = {props.itemTxt}
                editEnabled = {editEnabled}
                handleEditEnabled = {handleClickEditEnabled}
                handleTaskDone = {handleTaskDone}
                taskDone = {taskDone}
            />
                
                
            }
            {editEnabled && <Edititem
                editTask = {props.editTask}
                taskId = {props.taskId}
                editTxt = {props.editTxt}
                changeInputTxt = {props.changeInputTxt}
                confirmEdit = {props.confirmEdit}
                handleEditEnabled = {handleClickEditEnabled}
                handleTaskDone = {handleTaskDone}
                taskDone = {taskDone}
                editEnabled = {editEnabled}
                itemTxt = {props.itemTxt}
                newTxt = {taskTxtChanged}
            />
            }
        </>  
    )
}

const List = ({todoList, removeTask, editTask, editEnabled, changeInputTxt, editTriggered, editTxt, changeTask,confirmEdit}) => {

    return (
        <ul className = "List">
            {todoList.map((txt,id) => (
                <Taskcontainer 
                    editEnabled = {editEnabled} 
                    key = {id} 
                    taskId = {id} 
                    removeTask = {removeTask}
                    editTask = {editTask}
                    itemTxt = {txt}
                    editTxt = {editTxt}
                    changeTask = {changeTask}
                    changeInputTxt = {changeInputTxt}
                    confirmEdit = {confirmEdit}
                    editTriggered = {editTriggered}
                />
            ))}
        </ul>
    )
}

export default List
