import {useAuthStore} from "../store/useAuthStore.js";
import {useNavigate} from "react-router";
import {useEffect} from "react";

const Dashboard = () => {
    const {user, isLoading} = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login")
        }
    }, [user, isLoading, navigate]);

    if (isLoading) {
        return <p>Verification de l&#39;authentification...</p>
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Tableau de bord</h1>
                {user ? (
                    <div className="space-y-4">
                        <p className="text-lg text-gray-700 text-center">
                            Bienvenue sur votre tableau de bord, <span className="font-semibold">{user.name}</span> !
                        </p>
                        <p className="text-sm text-gray-500 text-center">Email : {user.email}</p>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Chargement...</p>
                )}
            </div>
        </div>

    );
}

export default Dashboard;