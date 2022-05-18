import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate(`/`)
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