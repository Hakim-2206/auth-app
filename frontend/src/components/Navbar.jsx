import {Link, useNavigate} from "react-router";
import {useAuthStore} from "../store/useAuthStore.js";
import {useEffect} from "react";

const Navbar = () => {
    const user = useAuthStore(state => state.user)
    const fetchUser = useAuthStore(state => state.fetchUser)
    const logout = useAuthStore(state => state.logout)
    const navigate = useNavigate()

    useEffect(() => {
        console.log("useEffect déclanché")
        fetchUser()
        console.log("🎯 User dans Navbar:", user);
    }, []);

    useEffect(() => {
        console.log("User dans navbar: ", user)
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/login")
    }

    return (
        <nav>
            <Link to={"/"}>Home</Link>
            {user ? (
                <>
                    <Link to={"/dashboard"}>Dashboard</Link>
                    <button onClick={handleLogout}>Déconnexion</button>
                </>
            ) : (
                <>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/register"}>Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;