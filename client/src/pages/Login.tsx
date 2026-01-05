import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/auth.api';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await loginUser({ email, password });
            localStorage.setItem('token', res.data?.token);
            navigate('/note');
        } catch (error) {
            setError("Invalid Email and Password");
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <form
                onSubmit={submit}
                className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-5"
            >
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Sign in to your account
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md">
                        {error}
                    </div>
                )}

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email address
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        Remember me
                    </label>
                    <a href="#" className="text-blue-600 hover:underline">
                        Forgot password?
                    </a>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                    Login
                </button>

                {/* Footer */}
                <p className="text-sm text-center text-gray-500">
                    Don’t have an account?{" "}
                    <span onClick={(e) => navigate('/register')} className="text-blue-600 hover:underline cursor-pointer">
                        Register
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Login
