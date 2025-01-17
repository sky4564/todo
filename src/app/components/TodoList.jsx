"use client"

import { useEffect, useState } from 'react';
import { client } from "@root/lib/hono"


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [render, setRender] = useState(false);

  useEffect(() => {
    console.log('이거렌더링 됨')
    GetList()
  }, [])

  const GetList = async () => {
    if (!render) {
      console.log('get list')
      const response = await client.api.work.$get();
      const { data } = await response.json();
      data.map((c, i) => {
        todos.push(c.todo)
      })
      setTodos([...todos])
      setRender(true)
    }
  }


  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  // const mutation = useAddTodo();

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
      // path parameter 사용 RPC 
      let form = { todo: 'iswork' }
      const res = await client.api.work[`${newTodo}`]["$post"]({ form })
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
            {todo}
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
