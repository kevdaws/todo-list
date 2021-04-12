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
  const addTodo = useCallback((event) => {
    
    // prevent refresh.
    event.preventDefault();
    if (!newTodo.trim()) return;
    updateTodos([
      {
        id: todos.length ? todos[0].id + 1 : 1,
        content: newTodo,
        done: false
      },
      ...todos
    ]);
    setNewTodo('');
  }, [newTodo, todos]);

  // updates todos by filtering removed todo.
  const removeTodo = useCallback((todo) => (event) => {
    updateTodos(todos.filter(t => t !== todo));
  }, [todos]);

  const markTodo = useCallback((todo, index) => (event) => {
    //console.log("Todo Marked");
    const tempTodos = [todos];
    tempTodos.splice(index, 1, { ...todo, done: !todo.done });
    updateTodos(tempTodos);
  }, [todos]);
  
  const markAll = useCallback(() => {
    const markedTodos = todos.map(todo => { return {...todo, done: !todo.done };
    });
    updateTodos(markedTodos);
  }, [todos]);
  
  return (
    <div>
      
      <h1>Todo List</h1>
      
      <form onSubmit={addTodo}>
        <label htmlFor="newTodo">Enter a Todo:</label>
        <input id="newTodo" name="newTodo" value={newTodo} onChange={changeTodo}/>
        <button>Add Todo</button>
      </form>

      <button onClick={markAll}>Mark All Todos</button>
     
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <input type="checkbox" checked={todo.done} onClick={markTodo(todo, index)}></input>
            <button onClick={removeTodo(todo)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;