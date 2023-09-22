import { useEffect } from "react";
import { useUser } from "../../context/user";

const Logout = () => {
    const { logout } = useUser();
    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    )
}

export default Logout;
