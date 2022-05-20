import { useNavigate } from "react-router-dom";
import { useUser } from "../api";

export default function Logout() {
    const [setToken, setError, setSuccess] = useUser();
    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setSuccess(null);
        setError(null);
        navigate(`/`);
    }

    return (
        <div>
            <div className="UserForm">
                <form>
                    <h2>Logout</h2>
                    <button onClick={logout}>Logout</button>
                </form>
            </div>
        </div>
    );
}