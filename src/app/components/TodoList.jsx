"use client"

import { useState } from 'react';
import { useAddTodo } from '../api/[[...route]]/use-add-todo';

import { client } from "@root/lib/hono"




// console.log('loading')
// console.log(client)

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

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
    }


    console.log('add todo ! ')
    // const res = await client.api.work.$get()
    // const res2 = await client.api.work.$post({
    //   json
    // })
    

    let form = {
      todo: 'num1_todo'
    }
    // path parameter 사용 RPC 
    const res = await client.api.work[`${newTodo}`]["$post"]({
      form
    })

    // 그냥 파라미미터 사용해서는 ?



    console.log(res)

    // mutation.mutate(values, {
    //   onSuccess: () => {
    //     alert('mutation is success !!')
    //   },
    // });
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
