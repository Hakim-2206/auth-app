import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.js";
import {useNavigate} from "react-router";

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
        } catch (err) {
            console.log("erreur:", err.message)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            {error && <p className='error'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text"
                       placeholder={"Name"}
                       onChange={(e) => setName(e.target.value)}
                       value={name}
                       required
                />
                <input type="email"
                       placeholder={"Email"}
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       required
                />
                <input type="password"
                       placeholder={"Password"}
                       onChange={(e) => setPassword(e.target.value)}
                       value={password}
                       required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;