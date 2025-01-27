import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Logout() {

    const navigate = useNavigate();
    useEffect(() => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userEmail");

        console.log("User logged out successfully");
        navigate("/login");
    }, []);

    return(
        <div className="Logout">

        </div>
    )
}
export default Logout;