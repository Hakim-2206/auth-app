import {useEffect, useState} from "react";
import {useAuthStore} from "../store/useAuthStore.js";
import {useNavigate} from "react-router";

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
        }
    };

    useEffect(() => {
        if (user && !isLoading) {
            navigate("/dashboard")
        }
    }, [user, isLoading, navigate]);

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email"
                       placeholder={"Email"}
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       required
                />
                <input type="password"
                       placeholder={"Password"}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className={"error"}>{error}</p>}
        </div>
    );
}

export default Login;