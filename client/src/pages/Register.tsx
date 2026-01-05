import { useState } from 'react'
import { register } from '../services/auth.api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await register(form);
        localStorage.setItem('token', res.data?.token);
        navigate('/login')
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Create Account
                </h2>
                <form action="" onSubmit={submit} className='space-y-4'>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>

                        <input type='submit'
                            value='Register'
                            className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                        />

                    </div>
                </form>
                <p className="text-sm text-gray-500 text-center mt-6">
                    Already have an account?{" "}
                    <span onClick={(e) => navigate('/login')} className="text-blue-600 hover:underline cursor-pointer">
                        Login
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Register
