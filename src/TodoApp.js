import React, { useState, useCallback, } from "react";

const TodoApp = () => {
  
  const [newTodo, setNewTodo] = useState('');
  const [todos, updateTodos] = useState([]);

  // track changes to todo input.
  const changeTodo = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  // do not allow empty todos.
  // each todo given unique id.
  const addedTodo = useCallback((event) => {
    
    // prevent refresh.
    event.preventDefault();
    if (!newTodo.trim()) return;
    updateTodos([
      {
        id: todos.length ? todos[0].id + 1 : 1,
        content: newTodo,
      },
      ...todos
    ]);
    setNewTodo('');
  }, [newTodo, todos]);


  return (
    <div>
      
      <h1>Todo List</h1>
      
      <form onSubmit={addedTodo}>
        <label htmlFor="newTodo">Enter a Todo:</label>
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          onChange={changeTodo}
        />
        <button>Add Todo</button>
      </form>
     
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <span>{todo.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default TodoApp;