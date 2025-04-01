import {useAuthStore} from "../store/useAuthStore.js";

const Home = () => {
    const {user} = useAuthStore()
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Hello {user ? user.name : ""}
            </h1>
            {user && (
                <p className="text-lg font-semibold text-green-500">
                    En ligne
                </p>
            )}
        </div>
    );
}

export default Home;