import {useEffect, useState} from "react";
import {useAuthStore} from "../store/useAuthStore.js";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, user, isLoading, error} = useAuthStore()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(email, password);
        } catch (err) {
            console.error(err.message)
            toast.error(err.message)
        }
    };

    useEffect(() => {
        if (user && !isLoading) {
            navigate("/")
        }
    }, [user, isLoading, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Connexion</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Entrez votre email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Entrez votre mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Connexion
                    </button>
                </form>
                {error && (
                    <p className="mt-4 text-center text-red-500">{error}</p>
                )}
            </div>
        </div>

    );
}

export default Login;