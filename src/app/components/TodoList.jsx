"use client"

import { useEffect, useState } from 'react';
import { getList, postData, deleteData } from '@root/src/app/components/TodoFn'


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    console.log('start useEffect')
    const loadData = async () => {
      try {
        const result = await getList();
        setTodos(result)
      } catch (error) {        
        return error
      }
    };
    loadData()        
  }, [])

  const handleInputChange = (e) => {
    console.log(newTodo)
    setNewTodo(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }
  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      console.log(todos)
      console.log(newTodo)
      const data = await postData(newTodo)
      setTodos([...todos, data]);
      console.log('setNewtodo')
      setNewTodo('');
    }
  };
  const handleDeleteTodo = (id) => {
    deleteData(id)
    const newTodos = todos.filter((todo, _) => {
      return id !== todo.id
    });
    setTodos(newTodos);
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Add a new todo"
          className="p-2 border border-gray-300 rounded mr-2 flex-grow"
        />
        <button
          onClick={handleAddTodo}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center mb-2 p-2 border border-gray-300 rounded"
          >
            {todo.title}
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="ml-2 bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>


    </div>
  );
};

export default TodoList;
