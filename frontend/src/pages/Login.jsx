import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import { apiService } from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await apiService.login({ email, password });

            // Stockage précis
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user?.id || data.userId);
            // On récupère le nom depuis la table 'user' renvoyée par le backend
            localStorage.setItem('userName', data.user?.full_name || 'User');

            navigate('/todo');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f7ff] px-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 border border-white">
                <div className="text-center mb-10">
                    <h2 className="text-[32px] font-extrabold text-[#1a1a1a] tracking-tight">Welcome Back</h2>
                    <p className="text-[#999] mt-2 text-sm">Please enter your details to sign in</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-xl flex items-center gap-3 text-orange-800 text-sm animate-in fade-in slide-in-from-top-1">
                        <i className="fas fa-exclamation-triangle"></i>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-[#444] mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-5 py-3.5 rounded-xl border border-[#eee] outline-none transition-all bg-[#fcfcfc] focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/5"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#444] mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-5 py-3.5 rounded-xl border border-[#eee] outline-none transition-all bg-[#fcfcfc] focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/5"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "w-full bg-[#6c63ff] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#6c63ff]/20 active:scale-[0.98]",
                            isLoading && "opacity-70 cursor-not-allowed"
                        )}
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center mt-10 text-sm text-[#888]">
                    Don't have an account? <Link to="/register" className="text-[#6c63ff] font-bold hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;