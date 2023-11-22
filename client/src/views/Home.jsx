import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
    <>
        <div>
            <button
            onClick={() => {
                localStorage.setItem("user_id", "p1");
                navigate("/");
            }}
            >
            Create Game
            </button>
            <button
            onClick={() => {
                localStorage.setItem("user_id", "p2");
                navigate("/");
            }}
            >
            Join Game
            </button>
        </div>
    </>
    );
}
