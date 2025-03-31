import {Link, useNavigate, useLocation} from "react-router";
import {useAuthStore} from "../store/useAuthStore.js";
import {useEffect} from "react";
import {toast} from "react-toastify";

const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const fetchUser = useAuthStore((state) => state.fetchUser);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
        toast.success("Vous êtes déconnecté");
    };

    return (
        <nav className="bg-gray-200 py-4 px-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo ou lien vers la page d'accueil */}
                <Link
                    to="/"
                    className={`text-lg ${
                        location.pathname === "/" ? "text-black" : "hover:text-gray-300"
                    } transition duration-300`}
                >
                    Accueil
                </Link>

                {/* Liens de navigation */}
                <div className="flex space-x-4 items-center">
                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className={`${
                                    location.pathname === "/dashboard"
                                        ? "text-blue-600"
                                        : "text-gray-600 hover:text-gray-800"
                                } transition duration-300`}
                            >
                                Tableau de bord
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-400/80 hover:bg-red-500 text-white px-4 py-2 rounded-md transition duration-300"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className={`${
                                    location.pathname === "/login"
                                        ? "text-blue-600"
                                        : "text-gray-600 hover:text-gray-800"
                                } transition duration-300`}
                            >
                                Connexion
                            </Link>
                            <Link
                                to="/register"
                                className={`${
                                    location.pathname === "/register"
                                        ? "bg-blue-400 hover:bg-blue-500 text-white"
                                        : "bg-gray-300 hover:bg-gray-400 text-black"
                                } px-4 py-2 rounded-md transition duration-300`}
                            >
                                Inscription
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
