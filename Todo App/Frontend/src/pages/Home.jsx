import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTodo = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/todo`, {todo});
      console.log(response)
    } catch (error) {
      console.error("Error setting loading state:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="text"
        className="border rounded-sm px-3 py-2"
        placeholder="Enter todo"
      />
      <button
        className="bg-black text-white px-3 py-1 w-32 rounded font-semibold"
        onClick={handleTodo}
      >
        Save
      </button>
    </div>
  );
};

export default Home;
