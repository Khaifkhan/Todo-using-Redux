import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "./features/todoSlice";

const Input = () => {
  const [text, setText] = useState("");
  const [editId, setEditid] = useState(null);
  const todos = useSelector((S) => S.todos.value);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Enter your todo");
      return;
    } else {
      if (editId) {
        dispatch(editTodo({ id: editId, text }));
        setEditid(null);
      } else {
        dispatch(addTodo({ text }));
      }
    }
    setText("");
  };

  const handleEdit = (ele) => {
    setText(ele.text);
    setEditid(ele.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <div className="bg-slate-800 my-10 mx-56 w-[800px] rounded-md px-10 py-6 gap-5 flex justify-between text-white">
        <input
          className="border-2 border-gray-500 w-[650px] rounded-md text-center text-black"
          type="text"
          placeholder="Enter your tasks here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-green-400 py-1 w-32 rounded-md"
          onClick={handleSubmit}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <div className="mt-3 bg-slate-800 w-[50vw] mx-72 rounded-md text-white">
        {todos.map((ele) => (
          <div
            key={ele.id}
            className="flex py-5 px-5 justify-between items-center"
          >
            <li key={ele.id} className="text-white list-none px-5 py-3 ">
              {ele.text}
            </li>
            <div className="flex justify-between gap-5">
              <button
                className="bg-green-400 rounded-md h-9 w-20"
                onClick={() => handleEdit(ele)}
              >
                Edit
              </button>
              <button
                className="bg-red-400 rounded-md h-9 w-20"
                onClick={() => handleDelete(ele.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Input;
