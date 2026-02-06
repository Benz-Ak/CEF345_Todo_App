import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { cn } from '../utils/cn';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        setIsLoading(true);
        try {
            await apiService.register({
                userName: formData.username, // Attention: api.js attend "userName"
                email: formData.email,
                password: formData.password
            });
            // On redirige vers le login avec un petit message de succès (optionnel)
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f7ff] px-4 py-12 font-sans">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

            <div className="w-full max-w-2xl bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10">

                <div className="text-center mb-10">
                    <h2 className="text-[32px] font-extrabold text-[#1a1a1a] tracking-tight">Create Account</h2>
                    <p className="text-[#999] mt-2 text-sm">Join us to start managing your tasks</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-center gap-3 text-orange-700 text-sm animate-in fade-in slide-in-from-top-2">
                        <i className="fas fa-triangle-exclamation text-lg"></i>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-bold text-[#444] mb-2 ml-1">Full Name</label>
                            <input
                                className="w-full px-5 py-3.5 rounded-xl border border-[#eee] outline-none transition-all bg-[#fcfcfc] focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/5 text-[15px]"
                                placeholder="John Doe"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-sm font-bold text-[#444] mb-2 ml-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-5 py-3.5 rounded-xl border border-[#eee] outline-none transition-all bg-[#fcfcfc] focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/5 text-[15px]"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-bold text-[#444] mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-5 py-3.5 rounded-xl border border-[#eee] outline-none transition-all bg-[#fcfcfc] focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/5 text-[15px]"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-bold text-[#444] mb-2 ml-1">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full px-5 py-3.5 rounded-xl border border-[#eee] outline-none transition-all bg-[#fcfcfc] focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/5 text-[15px]"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "w-full bg-[#6c63ff] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#6c63ff]/20 mt-4",
                            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#5a52e0] active:scale-[0.98]"
                        )}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <i className="fas fa-spinner animate-spin"></i> Creating Account...
                            </span>
                        ) : "Sign Up"}
                    </button>
                </form>

                <p className="text-center mt-10 text-sm text-[#888]">
                    Already have an account?{' '}
                    <Link to="/" className="text-[#6c63ff] font-bold hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;