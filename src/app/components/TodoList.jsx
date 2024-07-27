"use client"

import { useEffect, useState } from 'react';
import { client } from "@root/lib/hono"


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [render, setRender] = useState(false);

  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    console.log('start useEffect')
    GetList()
  }, [])

  const GetList = async () => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/todo`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data);
        console.log('this is get data ', data)
        console.log('this is set todos', todos)
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }


  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }



  const postData = async (param) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: param, description: 'hard desc' }),
    });
    const result = await response.json();    
    console.log(result)
  };

  // const mutation = useAddTodo();

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      await postData(newTodo)
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
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
              onClick={() => handleDeleteTodo(index)}
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
