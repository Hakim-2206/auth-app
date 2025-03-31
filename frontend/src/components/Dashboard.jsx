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
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <>
                    <p>Welcome to your dashboard, {user.name}</p>
                    <p>Email: {user.email}</p>
                </>
            ) : (
                <p>Chargement...</p>
            )}

        </div>
    );
}

export default Dashboard;