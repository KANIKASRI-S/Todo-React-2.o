
import TodoForm from "./components/TodoForm";

import TodoList from "./components/TodoList";

// import TodoSearch from "./components/TodoSearch";

import TodoUserSearch from "./components/TodoUserSearch";

import { useEffect, useState } from "react";


function App(){
  const title = "Todo Application";

  const [todos, setTodos] = useState([]);
 /*  todos
 ↓
All 200 todos from API */
const [userTodos, setUserTodos] = useState([]);
/* userTodos
 ↓
Only todos belonging to one user */

const [selectedUserId, setSelectedUserId] = useState("");
  // const [searchedTodo, setSearchedTodo] = useState(null);
  // const [searchedTodo, setSearchedTodo] = useState(undefined);

 /*  useEffect(() => {
  console.log("App Loaded");
}, []); */

useEffect(() => {
  async function fetchTodos() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      const data = await response.json();

      console.log(data);

      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  }

  fetchTodos();
}, []);



// add todo
function addTodo(title){
  // console.log( title);
  // I received Buy Milk. Print it in the console.
  // It doesn't put Buy Milk into our todos box.
  // That's why we need setTodos().

 /*  const newTodo = {
    id:Date.now(),
    title:title,
    completed:false
  };
  console.log(newTodo);
  setTodos([newTodo, ...todos]); */


  // add new todo to the beginning of the todos array.

  const newTodo={
    userId:Number(selectedUserId),
    id:Date.now(),
    title:title,
    complete:false
  };
  setTodos([newTodo, ...todos]);
  setUserTodos([newTodo, ...userTodos]);
  //  setUserTodos([newTodo, ...userTodos]);->>
  // new Todo immediately appear in the current user's Todo list.
}


// delete todo
function deleteTodo(id){
  // console.log(id);
  // id->every todo from api has an id
  /* setTodos((currentTodos) =>
 currentTodos.filter((todo) => todo.id !== id)); */
  setTodos((currentTodos) =>
    currentTodos.filter((todo) => todo.id !== id)
  );

  setUserTodos((currentTodos) =>
    currentTodos.filter((todo) => todo.id !== id)
  );

}


// edit todo
function editTodo(id, newTitle){
//  console.log(id, newTitle);
  setTodos((currentTodos) =>
    currentTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }
      return todo;
      /*   todo.id === id
        ? { ...todo, title: newTitle }
        : todo
    ) */
    })
  );

  setUserTodos ((currentTodos)=>
  currentTodos.map((todo)=>{
    if(todo.id === id){
      return{...todo,title:newTitle};
    }
    return todo;
  })
 );
}

// searchtodo
/* function searchTodo(id){
  // console.log("ID received:", id);
  // console.log("Todos:", todos);
  const todo=todos.find((todo) => todo.id === Number(id));
  // console.log(todo);
  // console.log("found todo:",todo)
  setSearchedTodo(todo || null);
} */


// UserSearch todo
/* function searchUserTodos(userId){
  console.log("user ID received:",userId);
   const result =todos.filter((todo)=> todo.userId===Number(userId));
    console.log("User todos:",result);
    setUserTodos(result);
   
} */


  // searchUserTodos
    function searchUserTodos(userId) {
  const result = todos.filter(
    (todo) => todo.userId === Number(userId)
  );

  setUserTodos(result);
  setSelectedUserId(userId);
}

// main
  return(
    <div className="app">
      {/* <h1>Todo Application</h1> */}
      <h1>{title}</h1>
    
    <TodoUserSearch searchUserTodos={searchUserTodos}/>
    {userTodos.length>0 && (
      <>
      <TodoForm addTodo={addTodo}/>
      <TodoList 
        todos={userTodos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}/>
        </>
    ) }


{/* <TodoForm addTodo={addTodo} />
       -> <TodoForm /> 
       -> <TodoList /> 
<TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} userTodos={userTodos}  /> */}
      {/* todos       → the todo data
deleteTodo  → the function that will delete a todo */}

{/* <TodoUserSearch searchUserTodos={searchUserTodos}/> */}
{/* user todos */}
{/* <div>
  <h2>User Todos</h2>
  {userTodos.map((todo)=>(
    <div key={todo.id}>
      <p>User ID:{todo.userId}</p>
      <p>Todo ID:{todo.id}</p>
      <p>Title:{todo.title}</p>
      <p>Completed:{todo.comleted ?"yes":"No"}</p>
      </div>
  ))}
</div> */}

<div className="user-todos">
    <h2>User Todos</h2>

    <div className="todo-table">
        <div className="todo-table-header">
            <span>ID</span>
            <span>Title</span>
            <span>Completed</span>
        </div>

        {userTodos.map((todo) => (
            <div className="todo-table-row" key={todo.id}>
                <span>{todo.id}</span>
                <span>{todo.title}</span>
                <span>
                    {todo.completed ? "Yes" : "No"}
                </span>
            </div>
        ))}
    </div>
</div>



 




{/* <TodoSearch searchTodo={searchTodo}/>
{searchedTodo === undefined ? null:searchedTodo ? (
  <div>
    <h2>Search Result</h2>

    <p>ID: {searchedTodo.id}</p>
    <p>Title: {searchedTodo.title}</p>
    <p>Completed: {searchedTodo.completed ? "Yes" : "No"}</p>
  </div>
):(
  <p>Todo not found</p>
)} */}


      
    </div>
  ) 

}
export default App;