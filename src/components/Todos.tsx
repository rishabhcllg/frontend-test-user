import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoSelector } from "./todosAtom";

const Todos = () => {
    const [currTask, setCurrTask] = useState("");
    const [todos, setTodos] = useRecoilState(todoSelector);

    const addTodo = () => {
        if (!currTask.trim().length) return;
        setTodos(prev => {
            return [...prev, { id: String(Math.random() * 1000), task: currTask, status: false }]
        });
        localStorage.setItem("todos", JSON.stringify(todos));
        setCurrTask("");
    }

    const updateTodo = (id: string) => {
        setTodos(todos => {
            return todos.map(todo => {
                if (todo.id == id) return { ...todo, status: !todo.status }
                else return todo
            });
        });
    }

    const deleteTodo = (id: string) => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }

    return (
        <div className="bg-white w-screen min-h-screen overflow-x-hidden shadow-md rounded-md p-4">
            <h1 className="text-2xl font-semibold mb-6">Todos</h1>
            <div className="flex items-center gap-2 mb-6">
                <input value={currTask} onChange={(e) => setCurrTask(e.target.value)} type="text" className="px-4 py-2 shadow-md rounded-md w-72 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="New task..." />
                <button className="px-4 py-2 shadow-md rounded-md bg-[#1e1e1e] text-white hover:bg-black transition" onClick={addTodo}>Add</button>
            </div>
            <div className="flex flex-col gap-3">
                {
                    todos.map(todo => {
                        return (
                            <div
                                className={`shadow-md flex items-center justify-between gap-6 rounded-md px-4 py-3 w-fit min-w-[320px] cursor-pointer ${todo.status ? "bg-gray-100" : "bg-white"}`}
                                key={todo.id}
                            >
                                <div onClick={() => updateTodo(todo.id)} className="flex-1 flex items-center gap-4">
                                    <h1 className={`text-lg ${todo.status ? "line-through text-gray-500" : "text-gray-800"}`}>{todo.task}</h1>
                                    <h1 className={`text-sm font-medium ${todo.status ? "text-green-600" : "text-yellow-600"}`}>{todo.status ? "Done" : "To do"}</h1>
                                </div>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Todos;