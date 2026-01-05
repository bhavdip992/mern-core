import { useEffect, useState } from "react";
import { getProfile } from "../services/auth.api";
import { getToken, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProfile = async () => {
            const token = getToken;
            if (!token) return;
            try {
                const res = await getProfile(token);
                if (res?.data) {
                    setUser(res.data?.user);
                }
            } catch (err) {
                console.error("Failed to fetch profile", err);
            }
        };

        fetchProfile();
    }, []);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
                <button onClick={(e) => navigate("/Note")} className="absolute top-6 left-6 text-gray-600 hover:text-gray-800 focus:outline-none">
                    <svg width="50" height="50" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9.854 6.646a.5.5 0 010 .708L7.207 10l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M6.5 10a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H7a.5.5 0 01-.5-.5z" clip-rule="evenodd" />
                    </svg>
                </button>
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                        {user?.name?.charAt(0) || "U"}
                    </div>
                </div>

                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-800">
                    {user?.name || "User Profile"}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    {user?.email || "user@example.com"}
                </p>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3">
                    <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition">
                        Edit Profile
                    </button>

                    <button onClick={(e) => logout()}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition focus:ring-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
