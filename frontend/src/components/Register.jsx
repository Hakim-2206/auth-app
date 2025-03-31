import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.js";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {register, error} = useAuthStore()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password)
            navigate("/dashboard")
            toast.success("Vous compte a été crée avec succès !")
        } catch (err) {
            console.log("erreur:", err.message)
            toast.error(err.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Inscription</h1>
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nom
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Entrez votre nom"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
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
                        S&#39;inscrire
                    </button>
                </form>
            </div>
        </div>

    );
}

export default Register;