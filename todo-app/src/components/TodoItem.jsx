// function TodoItem(props){
 import { useState } from "react";
function TodoItem({title, id, deleteTodo , editTodo}){
   
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);

    return(
        <div className="todo-item">
            {/* <p>{props.title}</p> */}
            {isEditing ? (
                <div className="todo-edit">
                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <button onClick={() => {
                    editTodo(id, editTitle);
                    setIsEditing(false);
                }}>Save</button>
                </div>
                 ):(<p className="todo-title">{title}</p>)}

                 

            <div className="todo-actions">
        

            {/* <button onClick={()=>editTodo(id, title)}>Edit</button> */}
            <button onClick={()=>setIsEditing(true)}>Edit</button>
            <button onClick={()=>deleteTodo(id)} >Delete</button>
            
        </div>
        </div>
    );
}
export default TodoItem;