import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Récupération dynamique des infos utilisateur
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName') || 'User'; // Récupère le nom stocké au login

    useEffect(() => {
        if (!userId) return navigate('/');
        apiService.getTasks().then(data => {
            if (Array.isArray(data)) setTasks(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [userId, navigate]);

    const addTask = async (e) => {
        if (e.key && e.key !== 'Enter') return;
        if (!inputValue.trim()) return;
        const title = inputValue;
        setInputValue('');
        try {
            const data = await apiService.addTask({ title });
            setTasks(prev => [{ id: data.id || data.insertId, title, is_done: 0 }, ...prev]);
        } catch (err) { console.error(err); }
    };

    const toggleTask = (task) => {
        const newStatus = task.is_done === 1 ? 0 : 1;
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, is_done: newStatus } : t));
        apiService.updateTaskStatus(task.id, newStatus).catch(err => console.error(err));
    };

    const deleteTask = (id) => {
        if (!window.confirm("Supprimer ?")) return;
        setTasks(prev => prev.filter(t => t.id !== id));
        apiService.deleteTask(id).catch(err => console.error(err));
    };

    const clearCompleted = () => {
        const completedCount = tasks.filter(t => t.is_done === 1).length;
        if (completedCount === 0) return;
        if (!window.confirm(`Nettoyer les ${completedCount} tâches terminées ?`)) return;

        // Logique fluide : on vide visuellement d'abord
        setTasks(prev => prev.filter(t => t.is_done === 0));
        apiService.clearCompleted().catch(err => console.error(err));
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'pending') return t.is_done === 0;
        if (filter === 'completed') return t.is_done === 1;
        return true;
    });

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f4f7ff] text-[#6c63ff] font-bold">Chargement...</div>;

    return (
        <div className="min-h-screen bg-[#f4f7ff] flex justify-center items-center p-4 font-sans">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

            <div className="w-full max-w-[550px] bg-white p-[20px_25px] rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] overflow-hidden">

                {/* Header avec Nom Dynamique */}
                <header className="flex justify-between items-center mb-5">
                    <div>
                        <h1 className="text-[20px] font-bold text-[#1a1a1a]">My Tasks</h1>
                        <p className="text-[#999] text-[12px]">Hello, <span className="text-[#6c63ff] font-semibold">{userName}</span> 👋</p>
                    </div>
                    <button
                        onClick={() => { localStorage.clear(); navigate('/'); }}
                        className="text-[#ff4d4d] hover:bg-red-50 p-2 rounded-lg text-[13px] font-medium transition-all"
                    >
                        <i className="fas fa-sign-out-alt mr-1"></i> Logout
                    </button>
                </header>

                {/* Input */}
                <div className="relative flex items-center mb-6">
                    <input
                        className="w-full p-[12px_20px] pr-[80px] border border-[#eee] rounded-[14px] text-[15px] outline-none bg-[#fcfcfc] focus:border-[#6c63ff] transition-all"
                        placeholder="New task..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={addTask}
                    />
                    <button
                        onClick={addTask}
                        className="absolute right-1.5 bg-[#6c63ff] text-white px-4 py-2 rounded-[11px] text-sm font-bold hover:bg-[#5a52e0] transition-all"
                    >
                        Add
                    </button>
                </div>

                {/* Filtres */}
                <div className="flex bg-[#f8f8f8] p-1 rounded-xl w-fit mb-5">
                    {['all', 'pending', 'completed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-lg text-[12px] capitalize transition-all ${filter === f
                                ? 'bg-white text-[#6c63ff] shadow-sm font-bold'
                                : 'text-[#888] hover:text-[#555]'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Liste scrollable */}
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <div key={task.id} className="group flex items-center justify-between p-3 bg-white border border-[#f8f8f8] rounded-xl hover:border-[#6c63ff30] transition-all">
                                <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggleTask(task)}>
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${task.is_done === 1 ? 'bg-[#6c63ff] border-[#6c63ff]' : 'border-[#ddd]'}`}>
                                        {task.is_done === 1 && <i className="fas fa-check text-white text-[9px]"></i>}
                                    </div>
                                    <span className={`text-[15px] transition-all ${task.is_done === 1 ? 'line-through text-[#ccc]' : 'text-[#444]'}`}>
                                        {task.title}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                                    className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 p-1.5 transition-all"
                                >
                                    <i className="fas fa-trash-can text-sm"></i>
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-[#bbb] text-sm italic">No tasks found.</div>
                    )}
                </div>

                <footer className="mt-6 pt-4 border-t border-[#f8f8f8] flex justify-between items-center text-[#aaa] text-[12px]">
                    <span>{tasks.filter(t => t.is_done === 0).length} pending</span>
                    <button onClick={clearCompleted} className="text-[#6c63ff] font-semibold hover:underline">Clear done</button>
                </footer>
            </div>
        </div>
    );
};

export default Todo;