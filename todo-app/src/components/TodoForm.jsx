import { useState } from "react";


function TodoForm({addTodo}) {
    const [title, setTitle] = useState("");
/* title      → current value

setTitle() → update the value */

function handleSubmit(){
    addTodo(title);
    setTitle(""); // clear the input field after adding a todo
}
    return(
        <div className="form-row">
            {/* <h2>Todo Form</h2> */}
        <div className ="input-row">
            <label >Todo</label>
        <input type="text"
         placeholder="Enter todo"
          value={title}
           onChange={(event)=>setTitle(event.target.value)}/>
        {/* <p>{title}</p> */}
        {/* ses the state, React immediately updates the screen. */}

        <button onClick={handleSubmit}>Add Todo</button>
</div>
</div>
    )
}

export default TodoForm;