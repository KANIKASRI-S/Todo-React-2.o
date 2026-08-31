import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoUserSearch from "./components/TodoUserSearch";

import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, useNavigate,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";


function TodoApp(){
  const title = "Todo Application";
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
 /*  todos
 ↓
All 200 todos from API */

const [userTodos, setUserTodos] = useState([]);
/* userTodos
 ↓
Only todos belonging to one user */

const [selectedUserId, setSelectedUserId] = useState("");



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

  // add new todo to the beginning of the todos array.

  const newTodo={
    userId:Number(selectedUserId),
    id:Date.now(),
    title:title,
    completed:false
  };

  setTodos([newTodo, ...todos]);

  setUserTodos([newTodo, ...userTodos]);

  // new Todo immediately appear in the current user's Todo list.
}



// delete todo
function deleteTodo(id){

  setTodos((currentTodos) =>
    currentTodos.filter((todo) => todo.id !== id)
  );

  setUserTodos((currentTodos) =>
    currentTodos.filter((todo) => todo.id !== id)
  );

}



// edit todo
function editTodo(id, newTitle){

  setTodos((currentTodos) =>
    currentTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }

      return todo;
    })
  );


  setUserTodos((currentTodos)=>
    currentTodos.map((todo)=>{
      if(todo.id === id){
        return{...todo,title:newTitle};
      }

      return todo;
    })
  );
}



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

     {/* <button onClick={() => navigate("/login")}>
      Logout
    </button> */}
    <button
  onClick={() => {
    localStorage.removeItem("user");
    navigate("/login");
  }}
>
  Logout
</button>

    <TodoUserSearch searchUserTodos={searchUserTodos}/>


    {userTodos.length>0 && (
      <>
        <TodoForm addTodo={addTodo}/>

        <TodoList
          todos={userTodos}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      </>
    )}

  </div>
);

}



// LOGIN + TODO ROUTING

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/todos" element={
          localStorage.getItem("user")?(
          <TodoApp />
  ):(
    <Navigate to="/login"/>
  )
  } />

        

      </Routes>

    </BrowserRouter>
  );

}


export default App;