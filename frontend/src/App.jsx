import {Routes, Route} from "react-router";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {useEffect} from "react";
import Navbar from "./components/Navbar.jsx";

const App = () => {

    const {fetchUser, isLoading} = useAuthStore()

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (isLoading) {
        return <div>Chargement en cours...</div>
    }
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/dashboard"} element={<Dashboard/>}/>
            </Routes>
        </div>
    );
}

export default App;