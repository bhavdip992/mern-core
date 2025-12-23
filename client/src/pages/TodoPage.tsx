import { useEffect, useState } from 'react';
import type { Todo } from "../types/todo";
import * as api from "../services/todo.api"

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [isEditmodelopen, setEditModelOpen] = useState(false);
    const [isDeletemodelopen, setDeleteModelOpen] = useState(false);
    const [editTodoId, setEditTodoId] = useState<string | null>(null);
    const [deleteTodoId, setDeleteTodoId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");

    useEffect(() => {
        api.fetchTodos().then(res => setTodos(res.data))
    }, []);

    const addTodo = async () => {
        if (!title) return;
        const res = await api.createTodos(title?.trim());
        setTodos([...todos, res.data]);
        setTitle('');
    }
    const updateTodo = async (id: string, title: string) => {
        const res = await api.updateTodos(id, { title });
        const newRes = await api.fetchTodos()
        setTodos([...newRes.data])
        setTitle('');
        setEditModelOpen(false);
        setEditTodoId('');
        setEditTitle('')
    }

    const deleteTodo = async (id: string) => {
        const res = await api.deleteTodos(id);
        const newRes = await api.fetchTodos()
        setTodos([...newRes.data])
        setDeleteModelOpen(false);
    }

    const markedDone = async (id: string, completed: boolean) => {
        const res = await api.updateTodos(id, { completed });
        const newRes = await api.fetchTodos()
        setTodos([...newRes.data])
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Todo App
                </h1>
                <form
                    onSubmit={(e) => { e.preventDefault(); addTodo(); }}
                    method="post"
                    className="flex gap-2 mb-6">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add a new todo..."
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="submit"
                        value="Add"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm
                   hover:bg-blue-700 transition cursor-pointer"
                    />
                </form>
                <div className="flex justify-evenly">
                    {/* Todo List */}
                    <ul className="space-y-3">
                        <span>Pending Todos</span>
                        {todos?.map((todo) => !todo.completed ? (
                            <li key={todo._id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                <span className="text-gray-700 text-sm">
                                    {todo.title}
                                </span>
                                <div className='flex items-center'>
                                    {/* Marked as Done */}
                                    <button type="button" className="p-2 rounded-md hover:bg-gray-200 transition cursor-pointer" onClick={() => markedDone(todo._id, true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                                            <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
                                        </svg>
                                    </button>
                                    {/* Edit Icon */}
                                    <button type="button" className="p-2 rounded-md hover:bg-gray-200 transition cursor-pointer" onClick={() => { setEditTodoId(todo._id); setEditTitle(todo.title); setEditModelOpen(true) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-gray-700">
                                            <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157 C2.42149 5.92172 2 6.93913 2 8V18 C2 19.0609 2.42149 20.0783 3.17163 20.8284 C3.92178 21.5786 4.93913 22 6 22H17 C19.21 22 20 20.2 20 18V13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    {/* Delete Icon */}
                                    <button type='button' className='p-2 rounded-md hover:bg-gray-200 transition cursor-pointer' onClick={() => { setDeleteTodoId(todo._id); setDeleteModelOpen(true); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100">
                                            <path d="M 46 13 C 44.35503 13 43 14.35503 43 16 L 43 18 L 32.265625 18 C 30.510922 18 28.879517 18.922811 27.976562 20.427734 L 26.433594 23 L 23 23 C 20.802666 23 19 24.802666 19 27 C 19 29.197334 20.802666 31 23 31 L 24.074219 31 L 27.648438 77.458984 C 27.88773 80.575775 30.504529 83 33.630859 83 L 66.369141 83 C 69.495471 83 72.11227 80.575775 72.351562 77.458984 L 75.925781 31 L 77 31 C 79.197334 31 81 29.197334 81 27 C 81 24.802666 79.197334 23 77 23 L 73.566406 23 L 72.023438 20.427734 C 71.120481 18.922811 69.489078 18 67.734375 18 L 57 18 L 57 16 C 57 14.35503 55.64497 13 54 13 L 46 13 z M 46 15 L 54 15 C 54.56503 15 55 15.43497 55 16 L 55 18 L 45 18 L 45 16 C 45 15.43497 45.43497 15 46 15 z M 32.265625 20 L 43.832031 20 A 1.0001 1.0001 0 0 0 44.158203 20 L 55.832031 20 A 1.0001 1.0001 0 0 0 56.158203 20 L 67.734375 20 C 68.789672 20 69.763595 20.551955 70.306641 21.457031 L 71.833984 24 L 68.5 24 A 0.50005 0.50005 0 1 0 68.5 25 L 73.5 25 L 77 25 C 78.116666 25 79 25.883334 79 27 C 79 28.116666 78.116666 29 77 29 L 23 29 C 21.883334 29 21 28.116666 21 27 C 21 25.883334 21.883334 25 23 25 L 27 25 L 61.5 25 A 0.50005 0.50005 0 1 0 61.5 24 L 28.166016 24 L 29.693359 21.457031 C 30.236405 20.551955 31.210328 20 32.265625 20 z M 64.5 24 A 0.50005 0.50005 0 1 0 64.5 25 L 66.5 25 A 0.50005 0.50005 0 1 0 66.5 24 L 64.5 24 z M 26.078125 31 L 73.921875 31 L 70.357422 77.306641 C 70.196715 79.39985 68.46881 81 66.369141 81 L 33.630859 81 C 31.53119 81 29.803285 79.39985 29.642578 77.306641 L 26.078125 31 z M 38 35 C 36.348906 35 35 36.348906 35 38 L 35 73 C 35 74.651094 36.348906 76 38 76 C 39.651094 76 41 74.651094 41 73 L 41 38 C 41 36.348906 39.651094 35 38 35 z M 50 35 C 48.348906 35 47 36.348906 47 38 L 47 73 C 47 74.651094 48.348906 76 50 76 C 51.651094 76 53 74.651094 53 73 L 53 69.5 A 0.50005 0.50005 0 1 0 52 69.5 L 52 73 C 52 74.110906 51.110906 75 50 75 C 48.889094 75 48 74.110906 48 73 L 48 38 C 48 36.889094 48.889094 36 50 36 C 51.110906 36 52 36.889094 52 38 L 52 63.5 A 0.50005 0.50005 0 1 0 53 63.5 L 53 38 C 53 36.348906 51.651094 35 50 35 z M 62 35 C 60.348906 35 59 36.348906 59 38 L 59 39.5 A 0.50005 0.50005 0 1 0 60 39.5 L 60 38 C 60 36.889094 60.889094 36 62 36 C 63.110906 36 64 36.889094 64 38 L 64 73 C 64 74.110906 63.110906 75 62 75 C 60.889094 75 60 74.110906 60 73 L 60 47.5 A 0.50005 0.50005 0 1 0 59 47.5 L 59 73 C 59 74.651094 60.348906 76 62 76 C 63.651094 76 65 74.651094 65 73 L 65 38 C 65 36.348906 63.651094 35 62 35 z M 38 36 C 39.110906 36 40 36.889094 40 38 L 40 73 C 40 74.110906 39.110906 75 38 75 C 36.889094 75 36 74.110906 36 73 L 36 38 C 36 36.889094 36.889094 36 38 36 z M 59.492188 41.992188 A 0.50005 0.50005 0 0 0 59 42.5 L 59 44.5 A 0.50005 0.50005 0 1 0 60 44.5 L 60 42.5 A 0.50005 0.50005 0 0 0 59.492188 41.992188 z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ) : '')}
                    </ul>
                    <ul className="space-y-3">
                        Completed Todos
                        {todos?.map((todo) => todo.completed ? (
                            <li key={todo._id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                <span className="text-gray-700 text-sm line-through">
                                    {todo.title}
                                </span>
                                {/* Delete Icon */}
                                <button type='button' className='p-2 rounded-md hover:bg-gray-200 transition cursor-pointer' onClick={() => { setDeleteTodoId(todo._id); setDeleteModelOpen(true); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100">
                                        <path d="M 46 13 C 44.35503 13 43 14.35503 43 16 L 43 18 L 32.265625 18 C 30.510922 18 28.879517 18.922811 27.976562 20.427734 L 26.433594 23 L 23 23 C 20.802666 23 19 24.802666 19 27 C 19 29.197334 20.802666 31 23 31 L 24.074219 31 L 27.648438 77.458984 C 27.88773 80.575775 30.504529 83 33.630859 83 L 66.369141 83 C 69.495471 83 72.11227 80.575775 72.351562 77.458984 L 75.925781 31 L 77 31 C 79.197334 31 81 29.197334 81 27 C 81 24.802666 79.197334 23 77 23 L 73.566406 23 L 72.023438 20.427734 C 71.120481 18.922811 69.489078 18 67.734375 18 L 57 18 L 57 16 C 57 14.35503 55.64497 13 54 13 L 46 13 z M 46 15 L 54 15 C 54.56503 15 55 15.43497 55 16 L 55 18 L 45 18 L 45 16 C 45 15.43497 45.43497 15 46 15 z M 32.265625 20 L 43.832031 20 A 1.0001 1.0001 0 0 0 44.158203 20 L 55.832031 20 A 1.0001 1.0001 0 0 0 56.158203 20 L 67.734375 20 C 68.789672 20 69.763595 20.551955 70.306641 21.457031 L 71.833984 24 L 68.5 24 A 0.50005 0.50005 0 1 0 68.5 25 L 73.5 25 L 77 25 C 78.116666 25 79 25.883334 79 27 C 79 28.116666 78.116666 29 77 29 L 23 29 C 21.883334 29 21 28.116666 21 27 C 21 25.883334 21.883334 25 23 25 L 27 25 L 61.5 25 A 0.50005 0.50005 0 1 0 61.5 24 L 28.166016 24 L 29.693359 21.457031 C 30.236405 20.551955 31.210328 20 32.265625 20 z M 64.5 24 A 0.50005 0.50005 0 1 0 64.5 25 L 66.5 25 A 0.50005 0.50005 0 1 0 66.5 24 L 64.5 24 z M 26.078125 31 L 73.921875 31 L 70.357422 77.306641 C 70.196715 79.39985 68.46881 81 66.369141 81 L 33.630859 81 C 31.53119 81 29.803285 79.39985 29.642578 77.306641 L 26.078125 31 z M 38 35 C 36.348906 35 35 36.348906 35 38 L 35 73 C 35 74.651094 36.348906 76 38 76 C 39.651094 76 41 74.651094 41 73 L 41 38 C 41 36.348906 39.651094 35 38 35 z M 50 35 C 48.348906 35 47 36.348906 47 38 L 47 73 C 47 74.651094 48.348906 76 50 76 C 51.651094 76 53 74.651094 53 73 L 53 69.5 A 0.50005 0.50005 0 1 0 52 69.5 L 52 73 C 52 74.110906 51.110906 75 50 75 C 48.889094 75 48 74.110906 48 73 L 48 38 C 48 36.889094 48.889094 36 50 36 C 51.110906 36 52 36.889094 52 38 L 52 63.5 A 0.50005 0.50005 0 1 0 53 63.5 L 53 38 C 53 36.348906 51.651094 35 50 35 z M 62 35 C 60.348906 35 59 36.348906 59 38 L 59 39.5 A 0.50005 0.50005 0 1 0 60 39.5 L 60 38 C 60 36.889094 60.889094 36 62 36 C 63.110906 36 64 36.889094 64 38 L 64 73 C 64 74.110906 63.110906 75 62 75 C 60.889094 75 60 74.110906 60 73 L 60 47.5 A 0.50005 0.50005 0 1 0 59 47.5 L 59 73 C 59 74.651094 60.348906 76 62 76 C 63.651094 76 65 74.651094 65 73 L 65 38 C 65 36.348906 63.651094 35 62 35 z M 38 36 C 39.110906 36 40 36.889094 40 38 L 40 73 C 40 74.110906 39.110906 75 38 75 C 36.889094 75 36 74.110906 36 73 L 36 38 C 36 36.889094 36.889094 36 38 36 z M 59.492188 41.992188 A 0.50005 0.50005 0 0 0 59 42.5 L 59 44.5 A 0.50005 0.50005 0 1 0 60 44.5 L 60 42.5 A 0.50005 0.50005 0 0 0 59.492188 41.992188 z"></path>
                                    </svg>
                                </button>
                            </li>) : '')}
                    </ul>
                </div>
            </div>
            {/* Edit Model */}
            {isEditmodelopen ?
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Update Todo
                            </h2>
                            <button type="button" className="text-gray-400 hover:text-gray-600" onClick={() => setEditModelOpen(false)}>
                                ✕
                            </button>
                        </div>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); updateTodo(editTodoId as string, editTitle) }}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Todo Title
                                </label>
                                <input type="text" placeholder="Update your todo..." value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" className="px-4 py-2 rounded-lg text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition" onClick={() => setEditModelOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div> : ''}
            {isDeletemodelopen ?
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
                        <button type="button" className="absolute right-2.5 top-1.25 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setDeleteModelOpen(false)}>
                            ✕
                        </button>
                        <div className="flex items-center justify-between mb-4 flex-col">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Delete Todo
                            </h2>
                            <div className='flex items-center justify-between content-between'>
                                <p>
                                    Are You Sure Want to Delete <b>{todos?.find((todo) => todo._id == deleteTodoId)?.title}</b>
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button type="button" className="px-4 py-2 rounded-lg text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition" onClick={() => setDeleteModelOpen(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700 transition" onClick={() => deleteTodo(deleteTodoId as string)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div> : ''}
        </div >)

}