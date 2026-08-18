import { useState } from "react";
function TodoUserSearch({searchUserTodos}){
    const[userId,setUserId]=useState("");
    return(
        // <div className="search-section">
        <div className="form-row">
            {/* <h2>Search Todos by User ID</h2> */}
            <label>User ID</label>
        <div className="input-row">
            <input type="number"
            placeholder="Enter User ID"
            value={userId}
            onChange={(event)=>setUserId(event.target.value)}/>
                <button onClick={()=>searchUserTodos(userId)}>Search</button>
        </div>
    </div>
        

    );
}

export default TodoUserSearch;