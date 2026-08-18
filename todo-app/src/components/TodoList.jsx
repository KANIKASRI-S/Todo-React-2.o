import TodoItem from './TodoItem';


function TodoList({todos,deleteTodo,editTodo,userTodos}){
    return(
        <div className='todo-list'>
            <h2>Todo List</h2>

          {/*   <TodoItem title="Learn React" />
            <TodoItem title="Learn usestate"/>
            <TodoItem title="Build a Todo App"/> */}

            
            {todos.map((todo) => (
                <TodoItem key={todo.id} title={todo.title} id={todo.id} deleteTodo={deleteTodo} editTodo={editTodo}  />
            ))}

          {/*  {userTodos.length>0
              ?userTodos.map((todo) => (
                <TodoItem key={todo.id} title={todo.title} id={todo.id} deleteTodo={deleteTodo} editTodo={editTodo}  />
            ))
           : todos.slice(0, 10).map((todo) => (
                <TodoItem key={todo.id} title={todo.title} id={todo.id} deleteTodo={deleteTodo} editTodo={editTodo}  />
            ))} */}
        </div>
    )
}
export default TodoList;